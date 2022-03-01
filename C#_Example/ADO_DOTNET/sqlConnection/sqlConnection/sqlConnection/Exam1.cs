using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sqlConnection
{
    public class Exam1
    {
        public static void Test()
        {
            //// TẠO CHUỖI KẾT NỐI bằng SqlConnectionStringBuilder
            //var stringBuilder = new SqlConnectionStringBuilder();
            //stringBuilder["Server"] = @"MINH\SQLEXPRESS";
            //stringBuilder["Database"] = "xtlab";
            //String sqlConnectionString = stringBuilder.ToString();
            String connectionString = @"Data Source=MINH\SQLEXPRESS;Initial Catalog=xtlab;Integrated Security=True;";
            var connection = new SqlConnection(connectionString);
            //// kích hoạt chế độ thu thập thông tin thống kê khi truy vấn
            //connection.StatisticsEnabled = true;
           
            //Console.WriteLine($"{"ConnectionString ",17} : {stringBuilder}");
            //Console.WriteLine($"{"DataSource ",17} : {connection.DataSource}");

            //// Bắt sự kiện trạng thái kết nối thay đổi
            //connection.StateChange += (object sender, StateChangeEventArgs e) =>
            //{
            //    Console.WriteLine($"Kết nối thay đổi: {e.CurrentState}, trạng thái trước: " + $"{e.OriginalState}");
            //}; 

            // mở kết nối
            connection.Open();

            // Dùng SqlCommand thi hành SQL  - sẽ  tìm hiểu sau
            using (DbCommand command = connection.CreateCommand())
            {
                // Câu truy vấn SQL
                command.CommandText = "select top(5) * from Sanpham";
                var reader = command.ExecuteReader();
                // Đọc kết quả truy vấn
                Console.WriteLine("\r\nCÁC SẢN PHẨM:");
                Console.WriteLine($"{"SanphamID ",10} {"TenSanpham "}");
                while (reader.Read())
                {
                    Console.WriteLine($"{reader["SanphamID"],10} {reader["TenSanpham"]}");
                }
            }

            // Lấy thống kê và in số liệu thống kê
            Console.WriteLine("Thông tin thống kê các tương tác đã thực hiện trên kết nôis");
            var dicStatics = connection.RetrieveStatistics();
            foreach (var key in dicStatics.Keys)
            {
                Console.WriteLine($"{key,17} : {dicStatics[key]}");
            }

            // Không dùng đến kết nối thì phải đóng lại (giải phóng)
            connection.Close();
        }
    }
}
