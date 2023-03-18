using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Ciudades.Data;

namespace Ciudades.Controllers {
    [ApiController]
    [Route ("Continent")]

        public class ContinentController : ControllerBase
    {   
        private readonly DataContext _context;
        public ContinentController(DataContext context)
        {
            _context = context;
        }
    }


}