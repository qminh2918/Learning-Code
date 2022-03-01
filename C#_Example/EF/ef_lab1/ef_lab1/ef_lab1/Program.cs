using ef_lab1.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace ef_lab1
{
    class Program
    {
        static void CreateDatabase()
        {
            using var dbcontext = new ProductDbContext();
            string dbname = dbcontext.Database.GetDbConnection().Database;

            var kq = dbcontext.Database.EnsureCreated();

            if (kq)
            {
                Console.WriteLine($"Tao db {dbname} thanh cong");
            } else
            {
                Console.WriteLine($"Khong tao duoc {dbname}");
            }

            //Console.WriteLine(dbname);

        }
        static void DropDatabase()
        {
            using var dbcontext = new ProductDbContext();
            string dbname = dbcontext.Database.GetDbConnection().Database;

            var kq = dbcontext.Database.EnsureDeleted();

            if (kq)
            {
                Console.WriteLine($"Xoa db {dbname} thanh cong");
            }
            else
            {
                Console.WriteLine($"Khong xoa duoc {dbname}");
            }

            //Console.WriteLine(dbname);

        }
        static void InsertProduct()
        {
            using var dbcontext = new ProductDbContext();
            var p1 = new Product()
            {
                ProductName = "San pham 1",
                Provider = "Cong ty 1",
            };

            dbcontext.Add(p1);
            int number_rows = dbcontext.SaveChanges();
            Console.WriteLine($"Da chen {number_rows} du lieu");
        }
        static void Main(string[] args)
        {
            //CreateDatabase();
            //DropDatabase();

            //insert, select, update, delete
            InsertProduct();
        }
    }
}
