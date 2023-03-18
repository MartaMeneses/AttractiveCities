using System.ComponentModel.DataAnnotations;

namespace Ciudades;

public class Country
{   
    [Key]
    public string? CountryID {get; set;}

    public string? CountryName { get; set; }
}
