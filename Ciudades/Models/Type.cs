using System.ComponentModel.DataAnnotations;

namespace Ciudades;

public class Type
{   
    [Key]
    public string? TypeID {get; set;}

    public string? TypeName { get; set; }
}