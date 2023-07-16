using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SQ_Project.Model
{
    [Table("company")]
    public class Company
    {
        [Key]
        public int Id { get; set; }
        public string name { get; set; }
    }
}
