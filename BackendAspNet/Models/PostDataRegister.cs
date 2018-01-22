using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAspNet.Models
{
    [NotMapped]
    public class PostDataRegister
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public DateTime CreatingDate { get; set; }
        public string Text { get; set; }
        public List<PostComment> Comments { get; set; }

    }

    [NotMapped]
    public class PostDataRegisterEx : PostDataRegister
    {
        public int RecordCount { get; set; }
    }
}
