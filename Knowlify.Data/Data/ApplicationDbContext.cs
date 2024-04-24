using Knowlify.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Knowlify.Data.Db
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasKey(u => u.Id);
            modelBuilder.Entity<Skill>().HasKey(s => s.Id);
            modelBuilder.Entity<Transaction>().HasKey(t => t.Id);
            modelBuilder.Entity<Review>().HasKey(r => r.Id);

            modelBuilder.Entity<User>()
                .HasMany(u => u.SkillsOffered)
                .WithMany();

            modelBuilder.Entity<User>()
                .HasMany(u => u.SkillsWanted)
                .WithMany();

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Requester)
                .WithMany()
                .HasForeignKey(t => t.RequesterId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Provider)
                .WithMany()
                .HasForeignKey(t => t.ProviderId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Reviewer)
                .WithMany()
                .HasForeignKey(r => r.ReviewerId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Reviewee)
                .WithMany()
                .HasForeignKey(r => r.RevieweeId)
                .OnDelete(DeleteBehavior.NoAction);
        }
        public DbSet<User> User { get; set; }
        public DbSet<Skill> Skill { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        public DbSet<Review> Review { get; set; }
    }
}
