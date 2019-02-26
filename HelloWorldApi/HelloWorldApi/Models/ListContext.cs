using System;
using Microsoft.EntityFrameworkCore;

namespace HelloWorldApi.Models
{
    public class ListContext : DbContext
    {
        public ListContext(DbContextOptions<ListContext> options)
            : base(options)
        {
        }

        public DbSet<ListItem> ListItems { get; set; }
    }
}
