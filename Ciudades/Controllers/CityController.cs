using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Ciudades.Data;

namespace Ciudades.Controllers{
    [Route(("City"))]
    [ApiController]

    public class CityController : ControllerBase{

              private readonly DataContext _context;

              public CityController (DataContext context){
                _context = context;
              }

            
        [HttpGet("{InputString}")]
        public async Task<ActionResult<List<City>>> GetCities(string InputString)
        {
            var query = 
            from s in _context.City
            where s.BelongsTo == InputString 
            select s;
            return Ok(query);
        }

        [HttpGet("/GetCity/{InputInt}")]
        public async Task<ActionResult<List<City>>> GetCity(int InputInt)
        {
            var query = 
            from s in _context.City
            where s.CityID == InputInt 
            select s;
            return Ok(query);
        }

        

    }
}