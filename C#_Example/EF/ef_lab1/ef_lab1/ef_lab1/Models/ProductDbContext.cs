using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ef_lab1.Models
{
    public class ProductDbContext : DbContext
    {
        public DbSet<Product> products { get; set; }

        private const string connectionString = @"
            Data Source=MINH\SQLEXPRESS;
            Initial Catalog=data01;
            Integrated Security=True";
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
