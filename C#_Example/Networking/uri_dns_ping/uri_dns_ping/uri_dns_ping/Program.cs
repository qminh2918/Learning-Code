using System;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;

namespace uri_dns_ping
{
    class Program
    {
        static void Main(string[] args)
        {
            #region Lớp Uri
            //string url = "https://xuanthulab.net/lap-trinh/csharp/?page=3#acff";
            //var uri = new Uri(url);
            //var uritype = typeof(Uri);
            //uritype.GetProperties().ToList().ForEach(property => {
            //    Console.WriteLine($"{property.Name,15} {property.GetValue(uri)}");
            //});
            //Console.WriteLine($"Segments: {string.Join(",", uri.Segments)}");
            #endregion

            #region Lớp tĩnh Dns và lớp IPHostEntry
            //string url = "https://www.bootstrapcdn.com/";
            //var uri = new Uri(url);
            //var hostEntry = Dns.GetHostEntry(uri.Host);
            //Console.WriteLine($"Host {uri.Host} có các IP");
            //hostEntry.AddressList.ToList().ForEach(ip => Console.WriteLine(ip));
            #endregion

            #region Lớp Ping
            //var ping = new Ping();
            //var pingReply = ping.Send("google.com.vn");
            //Console.WriteLine(pingReply.Status);
            //if (pingReply.Status == IPStatus.Success)
            //{
            //    Console.WriteLine(pingReply.RoundtripTime);
            //    Console.WriteLine(pingReply.Address);
            //}
            #endregion
        }
    }
}
