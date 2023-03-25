
namespace Ciudades;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Region
{   
    [Key]
    public string? RegionID {get; set;}

    public string? RegionName { get; set; }
}