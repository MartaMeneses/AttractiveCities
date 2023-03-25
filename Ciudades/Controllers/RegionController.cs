using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Ciudades.Data;

namespace Ciudades.Controllers{
    [ApiController]
    [Route("Region")]

    public class RegionController: ControllerBase
    {   
        private readonly DataContext _context;
        public RegionController(DataContext context)
        {
            _context = context;
        }
    }
}