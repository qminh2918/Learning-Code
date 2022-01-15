using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using System;
using System.IO;

namespace Dependency_injection
{
    class Program
    {
        #region Thiết kế truyền thống - tham chiếu trực tiếp đến Dependency
        //class ClassC
        //{
        //    public void ActionC() => Console.WriteLine("Action in ClassC");
        //}

        //class ClassB
        //{
        //    // Phụ thuộc của ClassB là ClassC
        //    ClassC c_dependency;

        //    public ClassB(ClassC classc) => c_dependency = classc;
        //    public void ActionB()
        //    {
        //        Console.WriteLine("Action in ClassB");
        //        c_dependency.ActionC();
        //    }
        //}

        //class ClassA
        //{
        //    // Phụ thuộc của ClassA là ClassB
        //    ClassB b_dependency;

        //    public ClassA(ClassB classb) => b_dependency = classb;
        //    public void ActionA()
        //    {
        //        Console.WriteLine("Action in ClassA");
        //        b_dependency.ActionB();
        //    }
        //}
        #endregion

        #region Thiết kế theo cách đảo ngược phụ thuộc Inverse Dependency
        interface IClassB
        {
            public void ActionB();
        }
        interface IClassC
        {
            public void ActionC();
        }

        class ClassC : IClassC
        {
            public ClassC() => Console.WriteLine("ClassC is created");
            public void ActionC() => Console.WriteLine("Action in ClassC");
        }

        class ClassB : IClassB
        {
            IClassC c_dependency;
            public ClassB(IClassC classc)
            {
                c_dependency = classc;
                Console.WriteLine("ClassB is created");
            }
            public void ActionB()
            {
                Console.WriteLine("Action in ClassB");
                c_dependency.ActionC();
            }
        }


        class ClassA
        {
            IClassB b_dependency;
            public ClassA(IClassB classb)
            {
                b_dependency = classb;
                Console.WriteLine("ClassA is created");
            }
            public void ActionA()
            {
                Console.WriteLine("Action in ClassA");
                b_dependency.ActionB();
            }
        }
        #endregion

        #region Viết Code mà không có khả năng áp dụng DI
        //public class Horn
        //{
        //    int level; // độ lớn của còi xe
        //    public Horn(int level) => this.level = level; // thêm khởi tạo level
        //    public void Beep() => Console.WriteLine($"(level {level}) Beep - beep - beep ...");
        //}

        //public class Car
        //{
        //    public void Beep()
        //    {
        //        // chức năng Beep xây dựng có định với Horn
        //        // tự tạo đối tượng horn (new) và dùng nó
        //        Horn horn = new Horn(10);     // Khởi tạo với Horn với tham số level
        //        horn.Beep();
        //    }
        //}
        #endregion

        #region Viết code có KHẢ NĂNG áp dụng DI
        //public class Horn
        //{
        //    public void Beep() => Console.WriteLine("Beep - beep - beep ...");
        //}

        //public class Car
        //{
        //    // horn là một Dependecy của Car
        //    Horn horn;

        //    // dependency Horn được đưa vào Car qua hàm khởi tạo
        //    public Car(Horn horn) => this.horn = horn;

        //    public void Beep()
        //    {
        //        // Sử dụng Dependecy đã được Inject
        //        horn.Beep();
        //    }
        //}
        #endregion

        class ClassB2 : IClassB
        {
            IClassC c_dependency;
            string message;
            public ClassB2(IClassC classc, string mgs)
            {
                c_dependency = classc;
                message = mgs;
                Console.WriteLine("ClassB2 is created");
            }
            public void ActionB()
            {
                Console.WriteLine(message);
                c_dependency.ActionC();
            }
        }

        public class MyServiceOptions
        {
            public string data1 { get; set; }
            public int data2 { get; set; }
        }

        public class MyService
        {
            public string data1 { get; set; }
            public int data2 { get; set; }

            // Tham số khởi tạo là IOptions, các tham số khởi tạo khác nếu có khai báo như bình thường
            public MyService(IOptions<MyServiceOptions> options)
            {
                // Đọc được MyServiceOptions từ IOptions
                MyServiceOptions opts = options.Value;
                data1 = opts.data1;
                data2 = opts.data2;
            }
            public void PrintData() => Console.WriteLine($"{data1} / {data2}");
        }


        static void Main(string[] args)
        {

            //ClassC objectC = new ClassC();
            //ClassB objectB = new ClassB(objectC);
            //ClassA objectA = new ClassA(objectB);
            //objectA.ActionA();

            //var car = new Car();
            //car.Beep();         // Beep - beep - beep ...

            //Horn horn = new Horn();

            //var car = new Car(horn); // horn inject vào car
            //car.Beep(); // Beep - beep - beep ...

            var services = new ServiceCollection();

            #region Sử dụng ServiceCollection cơ bản

            #region Dịch vụ được đăng ký là Singleton
            //// Đăng ký dịch vụ IClassC tương ứng với đối tượng ClassC
            //services.AddSingleton<IClassC, ClassC>();

            //var provider = services.BuildServiceProvider();

            //for (int i = 0; i < 5; i++)
            //{
            //    var service = provider.GetService<IClassC>();
            //    Console.WriteLine(service.GetHashCode());
            //}
            #endregion

            #region Dịch vụ được đăng ký là Transient
            //services.AddTransient<IClassC, ClassC>();

            //var provider = services.BuildServiceProvider();

            //for (int i = 0; i < 5; i++)
            //{
            //    var service = provider.GetService<IClassC>();
            //    Console.WriteLine(service.GetHashCode());
            //}
            #endregion

            #region Dịch vụ được đăng ký là Scoped
            //// Đăng ký dịch vụ IClassC tương ứng với đối tượng ClassC
            //services.AddScoped<IClassC, ClassC>();

            //var provider = services.BuildServiceProvider();

            //// Lấy dịch vụ trong scope toàn cục
            //for (int i = 0; i < 5; i++)
            //{
            //    var service = provider.GetService<IClassC>();
            //    Console.WriteLine(service.GetHashCode());
            //}

            //// Tạo ra scope mới
            //using (var scope = provider.CreateScope())
            //{
            //    // Lấy dịch vụ trong scope
            //    for (int i = 0; i < 5; i++)
            //    {
            //        var service = scope.ServiceProvider.GetService<IClassC>();
            //        Console.WriteLine(service.GetHashCode());
            //    }
            //}
            #endregion

            #region Kiểm tra tạo và inject các dịch vụ đăng ký trong ServiceCollection
            //// ClassA
            //// IClassB -> ClassB,  ClassB1
            //// IClassC -> ClassC,  ClassC1

            ////ServiceCollection services = new ServiceCollection();

            //services.AddSingleton<ClassA, ClassA>();
            //services.AddSingleton<IClassC, ClassC>();
            //services.AddSingleton<IClassB, ClassB>();

            //var provider = services.BuildServiceProvider();

            //ClassA service_a = provider.GetService<ClassA>();

            //service_a.ActionA();
            #endregion

            #region Sử dụng Delegate đăng ký
            //services.AddSingleton<IClassB, ClassB2>();
            //services.AddSingleton<IClassB>((IServiceProvider serviceprovider) => {
            //    var service_c = serviceprovider.GetService<IClassC>();
            //    var sv = new ClassB2(service_c, "Thực hiện trong ClassB2");
            //    return sv;
            //});

            // Factory nhận tham số là IServiceProvider và trả về đối tượng địch vụ cần tạo

            #endregion

            #region Sử dụng Options khởi tạo dịch vụ trong DI
            //services.Configure<MyServiceOptions>(
            //    options => {
            //    options.data1 = "Xin chao cac ban";
            //    options.data2 = 2021;
            //    }
            //);
            //services.AddSingleton<MyService>();
            //var provider = services.BuildServiceProvider();

            //var myservice = provider.GetService<MyService>();
            //myservice.PrintData();

            #endregion

            #region Sử dụng cấu hình từ File cho DI Container
            var configBuilder = new ConfigurationBuilder()
             .SetBasePath(Directory.GetCurrentDirectory())      // file config ở thư mục hiện tại
             .AddJsonFile("appsettings.json");                  // nạp config định dạng JSON
            var configurationroot = configBuilder.Build();                // Tạo configurationroot

            services.AddOptions();
            services.Configure<MyServiceOptions>(configurationroot.GetSection("MyServiceOptions"));

            services.AddSingleton<MyService>();

            var provider = services.BuildServiceProvider();

            var myservice = provider.GetService<MyService>();
            myservice.PrintData();

            // Kết quả:
            // ABCDE / 123456
            #endregion

            #endregion
        }
    }
}
