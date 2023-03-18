using System.ComponentModel.DataAnnotations;

namespace Ciudades;

public class Continent
{   
    [Key]
    public string? ContinentID {get; set;}

    public string? ContinentName { get; set; }
}