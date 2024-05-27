using Knowlify.Data.Models;
using Knowlify.Infraestructure.Data.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Knowlify.Data.Db
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new UserConfiguration());

            //TODO: Acabar de configurar las entidades restantes con sus respectivas configuraciones

            modelBuilder.Entity<Skill>().HasKey(s => s.Id);
            modelBuilder.Entity<Transaction>().HasKey(t => t.Id);
            modelBuilder.Entity<Review>().HasKey(r => r.Id);
            modelBuilder.Entity<Barter>().HasKey(b => b.Id);

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

            modelBuilder.Entity<Barter>()
                .HasOne(b => b.Transaction)
                .WithOne(t => t.Barter)
                .HasForeignKey<Transaction>(t => t.BarterId);
        }
        public DbSet<User> User { get; set; }
        public DbSet<Skill> Skill { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<Barter> Barter { get; set; }
    }
}
