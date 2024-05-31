using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;

namespace Knowlify.Services.AzureBlobStorage
{
    public class AzureBlobStorage
    {
        private readonly BlobServiceClient blobServiceClient;

        public AzureBlobStorage(IConfiguration configuration)
        {
            var connectionString = configuration["AzureBlobStorage:ConnectionString"];
            blobServiceClient = new BlobServiceClient(connectionString);
        }

        public async Task<string> UploadFileAsync(string containerName, string fileName, Stream fileStream)
        {
            var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
            await containerClient.CreateIfNotExistsAsync();

            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(fileStream);

            return blobClient.Uri.ToString();
        }
        public async Task<Stream> GetFileAsync(string containerName, string fileName)
        {
            var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
            await containerClient.CreateIfNotExistsAsync();
            var blobClient = containerClient.GetBlobClient(fileName);
            var response = await blobClient.DownloadAsync();

            return response.Value.Content;
        }
    }
}
