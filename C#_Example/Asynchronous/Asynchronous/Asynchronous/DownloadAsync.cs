using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Asynchronous
{
    public class DownloadAsync
    {
        public static async Task DownloadFile (string url)
        {
            Action downloadaction = () =>
            {
                using (var client = new WebClient())
                {
                    Console.Write("Starting download ..." + url);
                    // mang byte tai ve
                    byte[] data = client.DownloadData(new Uri(url));

                    //lay ten file de luu
                    string filename = System.IO.Path.GetFileName(url);
                    System.IO.File.WriteAllBytes(filename, data);
                }
            };

            Task task = new Task(downloadaction);
            task.Start();
            await task;
            Console.WriteLine("Download file complete");
        }
    }
}
