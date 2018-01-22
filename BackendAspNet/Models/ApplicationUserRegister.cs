using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAspNet.Models
{
    [NotMapped]
    public class ApplicationUserRegister
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
