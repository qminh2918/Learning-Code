using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hello_asp_1
{
    public class MyStartUp
    {
        // Đăng ký các dịch vụ của ứng dụng (DI)
        public void ConfigureServices(IServiceCollection services)
        {

        }

        // Xây dựng pipeline ( chuỗi Middleware )
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //StaticFileMiddleware
            //wwwroot
            app.UseStaticFiles();

            //Request:
            //EndpointRoutingMiddleware
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                // GET /
                endpoints.MapGet("/", async (context) => {
                    await context.Response.WriteAsync("Trang chu");
                });

                endpoints.MapGet("/about", async (context) => {
                    await context.Response.WriteAsync("Trang gioi thieu");
                });

                endpoints.MapGet("/contact", async (context) => {
                    await context.Response.WriteAsync("Trang lien he");
                });
            });

            //Terminate Middleware
            app.Map("/abc", app1 =>
            {
                app1.Run(async (HttpContext context) => {
                    await context.Response.WriteAsync("Noi dung tra ve tu ABC");
                });
            });

            app.UseStatusCodePages();

            //Terminate Middleware
            //app.Run(async(HttpContext context) => {
            //    await context.Response.WriteAsync("Xin chao");
            //});

        }
    }
}
