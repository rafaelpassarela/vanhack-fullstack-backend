using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BackendAspNet.Data;
using BackendAspNet.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace BackendAspNet.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class PostDataController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public PostDataController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: PostData
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            //PostDataRegister
            return Ok(await _context.PostData.ToListAsync());
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetList(int? from, int? by, int? category)
        {
            var where = (category > 0) ? $" where CategoryID = {category}" : "";
            var sql = $@"select pd.ID, u.Email as UserName, pd.CategoryID, c.Name as CategoryName, pd.CreatingDate, pd.Data as Text
                         from PostData pd
                         join Categories c on (c.ID = pd.CategoryID)
                         join AspNetUsers u on (u.Id = pd.UserId)
                         {where}
                         order by pd.ID desc ";

            if (by > 0 && from != null)
                sql += $"OFFSET {from} ROWS FETCH NEXT {by} ROWS ONLY";
            
            var qtd = await GetTotalRecords(category);

            var list = await _context.Database.GetDbConnection().QueryAsync<PostDataRegister>(sql);
            foreach (var item in list)
            {
                item.Comments = await _context.PostComment.Where(x => x.PostID == item.ID).ToListAsync();
            }

            dynamic res = new System.Dynamic.ExpandoObject();
            res.Records = qtd;
            res.List = list;
            
            return Ok( res);
        }

        private async Task<int> GetTotalRecords(int? category)
        {
            var where = (category > 0) ? $" where CategoryID = {category}" : "";
            var count = $"select count(1) from PostData {where}";

            return await _context.Database.GetDbConnection().QueryFirstOrDefaultAsync<int>(count);
        }

        // GET: PostData/Details/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var postData = await _context.PostData.SingleOrDefaultAsync(m => m.ID == id);
            if (postData == null)
            {
                return NotFound();
            }

            return Ok(postData);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PostDataRegister postData)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var selCategory = _context.Categories.FirstOrDefault(e => e.ID == postData.CategoryID);
                    ApplicationUser selUser = await _userManager.FindByEmailAsync(postData.UserName);
                    PostData data = new PostData
                    {
                        ID = (postData.ID < 0) ? 0 : postData.ID,
                        Category = selCategory,
                        Data = postData.Text,
                        CreatingDate = DateTime.Now,
                        User = selUser
                    };

                    if (postData.ID > 0)
                    {
                        _context.Update(data);
                    }
                    else
                    {
                        _context.Add(data);
                    }

                    await _context.SaveChangesAsync();
                    return Ok("Ok");
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PostDataExists(postData.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            } else
            {
                return BadRequest(new Exception("Invalid model state."));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, [FromBody] PostData postData)
        {
            if (id != postData.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(postData);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PostDataExists(postData.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return Ok("Ok");
        }

        // POST: PostData/Delete/5
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(m => m.ID == id);
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PostDataExists(int id)
        {
            return _context.PostData.Any(e => e.ID == id);
        }
    }
}
