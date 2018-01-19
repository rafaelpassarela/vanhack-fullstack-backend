using BackendAspNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAspNet.Data
{
    public static  class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Categories.Any())
            {
                return;   // DB has been seeded
            }

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
    }
}
