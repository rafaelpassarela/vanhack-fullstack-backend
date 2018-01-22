using BackendAspNet.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAspNet.Data
{
    public static  class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            //context.Database.EnsureCreated();
            context.Database.Migrate();

            if (!context.Categories.Any())
            {
                var categories = new Category[]
                {
                new Category{Name="General"},
                new Category{Name="Games"},
                new Category{Name="Software"},
                new Category{Name="Canada"}
                };
                foreach (Category cat in categories)
                {
                    context.Categories.Add(cat);
                }
                context.SaveChanges();
            }

            if (!context.ApplicationUser.Any())
            {
                var email = "contact@mrrafael.ca";
                var user = new ApplicationUser { UserName = email, Email = email };
                var result = userManager.CreateAsync(user, "123456");
            }

            if (!context.PostData.Any())
            {

            }
        }
    }
}
