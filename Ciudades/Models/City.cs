namespace Ciudades;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class City
{
    [Key] public int CityID {get; set;}
    public string? CityName {get; set;}

    [ForeignKey("Country")]public string? BelongsTo { get; set; }
    public double? History {get; set;}
    public double? Governance {get; set;}
    public double? Reputation {get; set;}
    public double? Space {get; set;}
    public double? Climate {get; set;}
    public double? Georisk {get; set;}
    public double? Geoeconomics {get; set;}
    public double? Gastronomy {get; set;}
    public double? Branding {get; set;}
    public double? Social_Activity {get; set;}
    public double? Expat_exp {get; set;}
    public double? Ethics {get; set;}
    public double? Equality {get; set;}
    public double? Human_cap {get; set;}
    public double? Smartcities {get; set;}
    public double? Innovation {get; set;}
    public double? Digital_Government {get; set;}
    public double? Education {get; set;}
    public double? Employability {get; set;}
    public double? Connection {get; set;}
    public double? Health {get; set;}
    public double? Sustainability {get; set;}
    public double? Tourism {get; set;}
    public double? Urban_Mobility {get; set;}
    public double? Urban_Planning {get; set;}
    public double? Safety {get; set;}
    public double? Net_Real_Income {get; set;}
    public double? Cost_of_Life {get; set;}
    
}