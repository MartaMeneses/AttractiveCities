using System.ComponentModel.DataAnnotations;

namespace Ciudades;

public class Flow
{   
    [Key]
    public int ID {get; set;}
    public int C1 { get; set; }
    public int C2 { get; set; }

    public int C3 { get; set; }

}
