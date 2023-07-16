using SQ_Project.Model;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SQ_Project.Config
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}
