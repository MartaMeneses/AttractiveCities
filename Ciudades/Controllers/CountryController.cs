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
    }
}
