using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SQ_Project.Model
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        public int id { get; set; }
        public string empCode { get; set; }
        public string? name { get; set; }
        public string? phoneNumber { get; set; }
        public string? address { get; set; }

        public string? status { get; set; }
        public int? companyId { get; set; }
        public int? departmentId { get; set; }
    }
}
