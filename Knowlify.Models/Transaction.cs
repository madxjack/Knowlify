using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Knowlify.Data.Models
{
    public class Transaction 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string RequesterId { get; set; } // Clave foránea del solicitante
        public User? Requester { get; set; }   // Propiedad de navegación al solicitante
        public string ProviderId { get; set; }   // Clave foránea del proveedor
        public User? Provider { get; set; }    // Propiedad de navegación al proveedor
        public int Credits { get; set; }
        public int BarterId { get; set; }
        public Barter Barter { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

    }
}

