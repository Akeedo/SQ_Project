using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SQ_Project.Model
{
    [Table("department")]
    public class Department
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public int companyId { get; set; }
    }
}
