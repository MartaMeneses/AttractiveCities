using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Ciudades.Data;

namespace Ciudades.Controllers{

    [ApiController]
    [Route("Flow")]

    public class FlowController : ControllerBase{
        private readonly DataContext _context;
        public FlowController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("/GetCompetitor/{InputInt}")]
        public async Task<ActionResult<List<Flow>>> GetCompetitors(int InputInt)
        {
            var query = 
            from c in _context.Flow
            where c.ID == InputInt
            select c;
            return Ok(query);
        }
    }

}
