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
    public class PostCommentController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostCommentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: PostData
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            //PostDataRegister
            return Ok(await _context.PostComment.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PostComment comment)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (comment.ID > 0)
                    {
                        _context.Update(comment);
                    }
                    else
                    {
                        _context.Add(comment);
                    }

                    await _context.SaveChangesAsync();
                    return Ok("Ok");
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PostCommentExists(comment.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            else
            {
                return BadRequest(new Exception("Invalid model state."));
            }
        }

        private bool PostCommentExists(int id)
        {
            return _context.PostComment.Any(e => e.ID == id);
        }
    }
}
