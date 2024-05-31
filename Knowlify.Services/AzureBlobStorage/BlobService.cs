using Azure.Storage.Blobs;
using Azure.Storage.Sas;

public class BlobService
{
    private readonly BlobServiceClient _blobServiceClient;

    public BlobService(BlobServiceClient blobServiceClient)
    {
        _blobServiceClient = blobServiceClient;
    }

    public string GetBlobSasUri(string containerName, string blobName)
    {
        try
        {
            if (string.IsNullOrEmpty(blobName))
            {
                throw new ArgumentNullException(nameof(blobName));
            }

            var blobContainerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            var blobClient = blobContainerClient.GetBlobClient(blobName);

            // Check if the blob exists
            if (!blobClient.Exists())
            {
                throw new InvalidOperationException("Blob does not exist.");
            }

            // Generate SAS for the blob
            var sasBuilder = new BlobSasBuilder
            {
                BlobContainerName = containerName,
                BlobName = blobName,
                Resource = "b",  // b for blob
                StartsOn = DateTimeOffset.UtcNow.AddMinutes(-5), // To mitigate clock skew
                //SAS is valid for 1 year
                ExpiresOn = DateTimeOffset.UtcNow.AddYears(1)
            };

            // Specify your SAS permissions
            sasBuilder.SetPermissions(BlobSasPermissions.Read);

            // Create SAS token
            var sasToken = blobClient.GenerateSasUri(sasBuilder).ToString();

            return sasToken;
        }
        catch (Exception ex)
        {
            // Handle exceptions
            throw new InvalidOperationException("Error generating SAS for blob.", ex);
        }
    }
}
