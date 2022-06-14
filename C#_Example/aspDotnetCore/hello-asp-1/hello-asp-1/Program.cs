using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hello_asp_1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<MyStartUp>();
                });

        //public static void Main(string[] args)
        //{
        //    Console.WriteLine("Start App");
        //    IHostBuilder builder = Host.CreateDefaultBuilder(args);
        //    // Cấu hình mặc định cho HOST tạo ra
        //    builder.ConfigureWebHostDefaults((IWebHostBuilder webBuilder) =>
        //    {
        //        // Tùy biến thêm về Host
        //        // webBuilder.
        //        webBuilder.UseWebRoot("public");
        //        webBuilder.UseStartup<MyStartUp>();
        //    });
        //    IHost host = builder.Build();
        //    host.Run();
        //}
    }
}
