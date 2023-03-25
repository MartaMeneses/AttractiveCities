using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ciudades;

public class Country
{   
    [Key]
    public string? CountryID {get; set;}

    public string? CountryName { get; set; }

    [ForeignKey("Region")]public int? BelongsTo { get; set; }
}
