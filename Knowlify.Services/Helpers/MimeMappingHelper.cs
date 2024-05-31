namespace Knowlify.Services.Helpers
{
    public static class MimeMappingHelper
    {
        private static readonly Dictionary<string, string> MimeMappings = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase)
        {
            { ".jpg", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".png", "image/png" },
            { ".gif", "image/gif" },
            { ".bmp", "image/bmp" },
            { ".tiff", "image/tiff" }
        // Añade otros tipos MIME según sea necesario
        };

        public static string GetMimeType(string extension)
        {
            if (MimeMappings.TryGetValue(extension, out string mimeType))
            {
                return mimeType;
            }
            return "application/octet-stream"; // Tipo MIME por defecto
        }
    }
}