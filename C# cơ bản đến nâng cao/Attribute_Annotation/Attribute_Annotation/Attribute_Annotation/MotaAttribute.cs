using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Attribute_Annotation
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Property | AttributeTargets.Method)]
    public class MotaAttribute : Attribute // có thể đặt tên Mota thay cho MotaAttribute
    {
        // Phương thức khởi tạo
        public MotaAttribute(string v) => Description = v;

        public string Description { set; get; }
    }
}
