using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Threading;

namespace Asynchronous
{
    public class DownloadWebsite01
    {
        public static string DownloadWebpage (string url, bool showresult)
        {
            using (var client = new WebClient())
            {
                Console.WriteLine("Starting download ...");
                string content = client.DownloadString(url);
                Thread.Sleep(3000);
                if(showresult)
                {
                    Console.WriteLine(content.Substring(0, 150));
                }
                return content;
            }
        }

        public static void TestDownloadpage()
        {
            string url = "https://code.visualstudio.com/";
            DownloadWebpage(url, true);
            Console.WriteLine("Do somthing ...");
        }

    }
}
