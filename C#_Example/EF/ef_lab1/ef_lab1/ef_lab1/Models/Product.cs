using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ef_lab1.Models
{
    [Table("product")]
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        [StringLength(50)]
        [Column("Tensanpham",TypeName ="ntext")]
        public string Name { get; set; }
        
        [Column(TypeName ="money")]
        public decimal Price { get; set; }

        public int CateId { get; set; }
        [ForeignKey("CateId")]
        //[Required]
        public Category Category { get; set; } // FK => PK 

        public void PrintInfo() => Console.WriteLine($"{ProductId} - {Name} - {Price} - {CateId}");
    }
}
