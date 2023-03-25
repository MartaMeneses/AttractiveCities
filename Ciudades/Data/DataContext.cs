using Microsoft.EntityFrameworkCore;

namespace Ciudades.Data{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        //public DbSet<Course> CoursesList => Set<Course>();
        public DbSet<Country> Country {get;set;}
        public DbSet<City> City {get;set;}
        public DbSet<Flow> Flow {get;set;}
        public DbSet<Region> Region {get;set;}
        public DbSet<Type> Type {get;set;}


    }
}