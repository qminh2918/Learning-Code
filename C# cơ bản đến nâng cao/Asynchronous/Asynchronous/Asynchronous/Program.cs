using System;
using System.Threading;
using System.Threading.Tasks;

namespace Asynchronous
{
     public class Program
    {
        static async Task Main(string[] args)
        {
            #region download website
            ////DownloadWebsite01.TestDownloadpage();

            //Console.WriteLine($"{' ',5} {Thread.CurrentThread.ManagedThreadId,3} MainThread");
            //Task<string> t1 = TestAsync01.Async1("A", "B");

            //Console.WriteLine("làm gì đó ở thread chính sau khi 2 task chạy");

            ////Chờ t1 kết thúc và đọc kết quả trả về
            //t1.Wait();
            //String s = t1.Result;
            //TestAsync01.WriteLine(s, ConsoleColor.Red);

            ////ngăn không cho thread chính kết thúc
            ////Nếu thread chính kết thúc mà t2 đang chạy nó sẽ bị ngắt
            //Console.ReadKey();
            #endregion

            #region async await
            //var t1 = TestAsyncAwait.Async1("x", "y");
            //var t2 = TestAsyncAwait.Async2();

            //// Làm gì đó khi t1, t2 đang chạy
            //Console.WriteLine("Task1, Task2 đang chạy");


            //await t1; // chờ t1 kết thúc
            //Console.WriteLine("Làm gì đó khi t1 kết thúc");

            //await t2; // chờ t2 kết thúc
            #endregion

            #region async tra ve Task
            //string url = "https://github.com/microsoft/vscode/archive/1.48.0.tar.gz";
            //var taskdownload = DownloadAsync.DownloadFile(url);
            ////..
            //Console.WriteLine("Làm gì đó khi file đang tải");
            ////..
            //await taskdownload;
            //Console.WriteLine("Làm gì đó khi file tải xong");
            #endregion

            #region Yêu cầu kết thúc Task đang thực thi với CancellationToken
            //// Đối tượng để phát đi yêu cầu dừng Task
            //var tokenSource = new CancellationTokenSource();

            //// Lấy token - để sử dụng bởi task, khi task thực thi
            //// token.IsCancellationRequested là true nếu có phát yêu cầu dừng
            //// bằng cách gọi tokenSource.Cancel
            //var token = tokenSource.Token;


            //// Tạo task1 có sử dụng CancellationToken
            //Task task1 = new Task(
            //    () => {

            //        for (int i = 0; i < 10000; i++)
            //        {
            //    // Kiểm tra xem có yêu cầu dừng thì kết thúc task
            //    if (token.IsCancellationRequested)
            //            {
            //                Console.WriteLine("TASK1 STOP");
            //                token.ThrowIfCancellationRequested();
            //                return;
            //            }

            //    // Chạy tiếp
            //    Console.WriteLine("TASK1 runing ... " + i);
            //            Thread.Sleep(300);
            //        }
            //    },
            //    token
            //);


            //// Tạo task1 có sử dụng CancellationToken
            //Task task2 = new Task(
            //    () => {

            //        for (int i = 0; i < 10000; i++)
            //        {
            //            if (token.IsCancellationRequested)
            //            {
            //                Console.WriteLine("TASK1 STOP");
            //                token.ThrowIfCancellationRequested();
            //                return;
            //            }
            //            Console.WriteLine("TASK2 runing ... " + i);
            //            Thread.Sleep(300);
            //        }
            //    },
            //    token
            //);

            //// Chạy các task
            //task1.Start();
            //task2.Start();

            //while (true)
            //{
            //    var c = Console.ReadKey().KeyChar;

            //    // Nếu bấm e sẽ phát yêu cầu dừng task
            //    if (c == 'e')
            //    {
            //        // phát yêu cầu dừng task
            //        tokenSource.Cancel();
            //        break;
            //    }

            //}

            //Console.WriteLine("Các task đã kết thúc, bấm phím bất kỳ kết thúc chương trình");
            //Console.ReadKey();
            #endregion
        }
    }
}
