using System;

namespace VirtualMethod
{
    class Program
    {
        static void Main(string[] args)
        {
            Product p1 = new Product();
            Product p2 = new Iphone();
            p1.TestProduct();
            p2.TestProduct();
        }
    }
}
