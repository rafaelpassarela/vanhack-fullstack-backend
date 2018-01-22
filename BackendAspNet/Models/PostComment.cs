using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAspNet.Models
{
    public class PostComment
    {
        public int ID { get; set; }
        public int PostID { get; set; }
        public string UserEmail { get; set; }
        public String Comment { get; set; }
    }
}
