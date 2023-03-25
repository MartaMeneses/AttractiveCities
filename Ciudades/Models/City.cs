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
    public double? SocialActivity {get; set;}
    public double? ExpatExp {get; set;}
    public double? Ethics {get; set;}
    public double? Equality {get; set;}
    public double? HumanCap {get; set;}
    public double? Smartcities {get; set;}
    public double? Innovation {get; set;}
    public double? DigitalGovernment {get; set;}
    public double? Education {get; set;}
    public double? Employability {get; set;}
    public double? Connection {get; set;}
    public double? Health {get; set;}
    public double? Sustainability {get; set;}
    public double? Tourism {get; set;}
    public double? UrbanMobility {get; set;}
    public double? UrbanPlanning {get; set;}
    public double? Safety {get; set;}
    public double? Income {get; set;}
    public double? NetPurchasePower {get; set;}
    
}