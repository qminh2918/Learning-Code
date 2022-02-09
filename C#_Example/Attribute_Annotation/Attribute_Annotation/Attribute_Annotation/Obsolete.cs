using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Attribute_Annotation
{
    public class Obsolete
    {
        [Obsolete("Phương thức này lỗi thời, hãy  dùng phương thức Abc")]
        public static void Method1()
        {
            Console.WriteLine("Phương thức chạy");
        }
    }
}
