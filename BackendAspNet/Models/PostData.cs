using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAspNet.Models
{
    public class PostData
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public ApplicationUser User { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        public DateTime CreatingDate { get; set; }

        [Required]
        public String Data { get; set; }
    }
}
