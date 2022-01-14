using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VirtualMethod
{
    class Iphone : Product
    {
        public Iphone()
        {
            price = 500;
        }
        public override void ProductInfo()
        {
            Console.WriteLine($"Điện thoại Iphone");
            base.ProductInfo();
        }
    }
}

