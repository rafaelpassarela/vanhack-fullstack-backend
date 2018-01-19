using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAspNet.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BackendAspNet.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
    }
}
