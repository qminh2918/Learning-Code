using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;


public class MyStartUp {
    
    // Đăng ký các dịch vụ của ứng dụng (DI)
    public void ConfigureServices(IServiceCollection services) {
        //services.AddSingleton
    }

    // Xây dựng pipeline (chuỗi Middleware)
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {

    }
}