using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.IO;
using System.Text;

namespace httpClient
{
    class Program
    {
        #region tạo truy vấn GET, tải về trang Web - hiện thị các header và trả về content kết quả
        /// In ra thông tin các Header của HTTP Response
        public static void ShowHeaders(HttpHeaders headers)
        {
            Console.WriteLine("CÁC HEADER:");
            foreach (var header in headers)
            {
                foreach (var value in header.Value)
                {
                    Console.WriteLine($"{header.Key,25} : {value}");

                }
            }
            Console.WriteLine();
        }

        // Tải về trang web và trả về chuỗi nội dung
        public static async Task<string> GetWebContent(string url)
        {
            // Khởi tạo http client
            using var httpClient = new HttpClient();

            // Thiết lập các Header nếu cần
            httpClient.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml+json");
            try
            {
                // Thực hiện truy vấn GET
                HttpResponseMessage response = await httpClient.GetAsync(url);

                // Hiện thị thông tin header trả về
                ShowHeaders(response.Headers);

                // Phát sinh Exception nếu mã trạng thái trả về là lỗi
                response.EnsureSuccessStatusCode();

                Console.WriteLine($"Tải thành công - statusCode {(int)response.StatusCode} {response.ReasonPhrase}");

                Console.WriteLine("Starting read data");

                // Đọc nội dung content trả về - ĐỌC CHUỖI NỘI DUNG
                string htmltext = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Nhận được {htmltext.Length} ký tự");
                Console.WriteLine();
                return htmltext;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        #endregion
         
        static async Task Main(string[] args)
        {
            //var c = await GetWebContent("https://www.google.com/search?q=xuanthulab");
            //Console.WriteLine(c);

            #region Ví dụ sử dụng ReadAsByteArrayAsync
            //var url = "https://raw.githubusercontent.com/xuanthulabnet/jekyll-example/master/images/jekyll-01.png";
            //byte[] bytes = await DownloadDataBytes(url);

            //string filepath = "anh1.png";
            //using (var stream = new FileStream(filepath, FileMode.Create, FileAccess.Write, FileShare.None))
            //{
            //    stream.Write(bytes, 0, bytes.Length);
            //    Console.WriteLine("save " + filepath);
            //}
            #endregion
        }
    }
}
