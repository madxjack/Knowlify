
namespace Knowlify.Data.Models
{
    public class Transaction 
    {
        public int Id { get; set; }
        public int RequesterId { get; set; } // Clave foránea del solicitante
        public User? Requester { get; set; }   // Propiedad de navegación al solicitante
        public int ProviderId { get; set; }   // Clave foránea del proveedor
        public User? Provider { get; set; }    // Propiedad de navegación al proveedor
        public int Credits { get; set; }
        public string Status { get; set; } = "Pending";
        public DateTime Date { get; set; }

    }
}

