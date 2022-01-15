using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Attribute_Annotation
{
    public class Employer
    {
        [Required(ErrorMessage = "Employee {0} is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Tên từ 3 đến  100 ký tự")]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        [Range(18, 99, ErrorMessage = "Age should be between 18 and 99")]
        public int Age { get; set; }


        [DataType(DataType.PhoneNumber)]
        [Phone]
        public string PhoneNumber { set; get; }

        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        public static void checkValidationContext()
        {
            Employer user = new Employer();
            user.Name = "AF";
            user.Age = 6;
            user.PhoneNumber = "1234as";
            user.Email = "test@re";


            ValidationContext context = new ValidationContext(user, null, null);
            // results - lưu danh sách ValidationResult, kết quả kiểm tra
            List<ValidationResult> results = new List<ValidationResult>();
            // thực hiện kiểm tra dữ liệu
            bool valid = Validator.TryValidateObject(user, context, results, true);

            if (!valid)
            {
                // Duyệt qua các lỗi và in ra
                foreach (ValidationResult vr in results)
                {
                    Console.ForegroundColor = ConsoleColor.Blue;
                    Console.Write($"{vr.MemberNames.First(),13}");
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"    {vr.ErrorMessage}");
                }
            }
        }

    }
}
