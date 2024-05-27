using Knowlify.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Knowlify.Infraestructure.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder) 
        { 
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(e => e.Credits)
                .IsRequired();
            builder.Property(e => e.ProfilePicture)
                .HasMaxLength(100);
            builder.Property(e => e.Description)
                .HasMaxLength(500);
            builder.Property(e => e.City)
                .HasMaxLength(100);
        }
    }
}

