using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VirtualMethod
{
    //class Product
    //{
    //    protected double price = 0;
    //    //phương thức ảo ProductInfo
    //    public virtual void ProductInfo()
    //    {
    //        Console.WriteLine($"Giá sản phẩm {price}");
    //    }

    //    public void TestProduct()
    //    {
    //        this.ProductInfo();
    //    }
    //}   

    interface IProduct
    {
        public void ShowPrice();
    }

    interface IOrder
    {
        public void OrderAction(int numberProduct);
    }

    class Product: IProduct, IOrder
    {
        double price;
        public Product(double price)
        {
            this.price = price;
        }

        public void ShowPrice()
        {
            Console.WriteLine($"Price: {price}");
        }

        public void OrderAction(int numberProduct)
        {
            Console.WriteLine($"Order: {numberProduct}");
        }
    }
}
