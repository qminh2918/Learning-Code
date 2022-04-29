using ef_lab1.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace ef_lab1
{
    class Program
    {
        static void CreateDatabase()
        {
            using var dbcontext = new ShopContext();
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
            using var dbcontext = new ShopContext();
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

        //static void InsertProduct()
        //{
        //    using var dbcontext = new ShopContext();
        //    var products = new object[]
        //    {
        //        new Product() {ProductName = "sanpham3", Provider = "ctya"},
        //        new Product() {ProductName = "sanpham4", Provider = "ctyb"},
        //        new Product() {ProductName = "sanpham5", Provider = "ctyc"},
        //    };

        //    dbcontext.AddRange(products);
        //    int number_rows = dbcontext.SaveChanges();
        //    Console.WriteLine($"Da chen {number_rows} du lieu");
        //}
        //static void ReadProducts()
        //{
        //    using var dbcontext = new ShopContext();
        //    //linq
        //    //var products = dbcontext.products.ToList();
        //    //products.ForEach(product => product.PrintInfo());

        //    //var qr = from product in dbcontext.products
        //    //         where product.ProductId >= 2
        //    //         orderby product.ProductId descending
        //    //         select product;
        //    //qr.ToList().ForEach(product => product.PrintInfo());

        //    Product product = (from p in dbcontext.products
        //                       where p.ProductId == 7
        //                       select p).FirstOrDefault();
        //    if (product != null)
        //    {
        //        product.PrintInfo();
        //    }
        //    else
        //    {
        //        Console.WriteLine("Khong tim thay san pham");
        //    }
        //}

        //static void RenameProduct(int id, string newName)
        //{
        //    using var dbcontext = new ShopContext();
        //    Product product = (from p in dbcontext.products
        //                       where p.ProductId == id
        //                       select p).FirstOrDefault();
        //    if (product != null)
        //    {
        //        product.ProductName = newName;
        //        int number_rows = dbcontext.SaveChanges();
        //        Console.WriteLine($"Da cap nhat {number_rows} du lieu");
        //    }
        //    else
        //    {
        //        Console.WriteLine("Khong tim thay san pham");
        //    }
        //}
        //static void DeleteProduct(int id)
        //{
        //    using var dbcontext = new ShopContext();
        //    Product product = (from p in dbcontext.products
        //                       where p.ProductId == id
        //                       select p).FirstOrDefault();
        //    if (product != null)
        //    {
        //        dbcontext.Remove(product);
        //        int number_rows = dbcontext.SaveChanges();
        //        Console.WriteLine($"Delete {number_rows} du lieu");
        //    }
        //    else
        //    {
        //        Console.WriteLine("Khong tim thay san pham");
        //    }
        //}

        static void InsertData()
        {
            using var dbcontext = new ShopContext();
            //Category c1 = new Category() { Name = "Dien thoai", Description = "Cac loai dien thoai" };
            //Category c2 = new Category() { Name = "Do uong", Description = "Cac loai do uong" };
            //dbcontext.categories.Add(c1);
            //dbcontext.categories.Add(c2);

            var c1 = (from c in dbcontext.categories where c.CategoryId == 1 select c).FirstOrDefault();
            var c2 = (from c in dbcontext.categories where c.CategoryId == 2 select c).FirstOrDefault();

            dbcontext.Add(new Product() { Name = "Iphone 8", Price = 1000, CateId = 1 });
            dbcontext.Add(new Product() { Name = "Samsung", Price = 900, Category = c1 });
            dbcontext.Add(new Product() { Name = "ruou vang", Price = 500, Category = c2 });
            dbcontext.Add(new Product() { Name = "nokia", Price = 600, Category = c1 });
            dbcontext.Add(new Product() { Name = "cafe", Price = 100, Category = c2 });


            dbcontext.SaveChanges();
        }

        static void Main(string[] args)
        {
            //DropDatabase();
            //CreateDatabase();

            //insert, select, update, delete

            //InsertProduct();
            //ReadProducts();
            //RenameProduct(1, "damquangminh");
            //DeleteProduct(3);

            //Logging

            //InsertData();
            using var dbcontext = new ShopContext();

            //var product = (from p in dbcontext.products where p.ProductId == 3 select p).FirstOrDefault();
            //var e = dbcontext.Entry(product);
            //e.Reference(p => p.Category).Load();
            //product.PrintInfo();

            //if (product.Category != null)
            //{
            //    Console.WriteLine($"{product.Category.Name} - {product.Category.Description}");
            //}
            //else Console.WriteLine("Category == null");

            var category = (from c in dbcontext.categories where c.CategoryId == 2 select c).FirstOrDefault();
            Console.WriteLine($"{category.CategoryId} - {category.Name}");
        }
    }
}
