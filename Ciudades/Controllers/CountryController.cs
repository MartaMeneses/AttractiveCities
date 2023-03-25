using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Ciudades.Data;

namespace Ciudades.Controllers{

    [ApiController]
    [Route("Country")]
    public class CountryController : ControllerBase
    {   
        private readonly DataContext _context;
        public CountryController(DataContext context)
        {
            _context = context;
        }

       [HttpGet]
       public async Task<ActionResult<List<Country>>> GetCountries(){

        return Ok(await _context.Country.ToListAsync());
       }

        [HttpGet("{InputString}")]
        public async Task<ActionResult<List<Country>>> GetRegion(string InputString)
        {
            var query = 
            from s in _context.Country
            where s.CountryID == InputString 
            select s;
            return Ok(query);
        }

        [HttpGet("/GetCountriesRegion/{InputInt}")]
        public async Task<ActionResult<List<Country>>> GetCountriesRegion(int InputInt)
        {
                var query = from s in _context.Country
                where s.BelongsTo == InputInt
                select s;
                return Ok(query);
        }

    }
}
