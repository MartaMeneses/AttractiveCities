using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Ciudades.Data;

namespace Ciudades.Controllers{
  [ApiController]
  [Route("Type")]

    public class TypeController: ControllerBase{
               private readonly DataContext _context;
        public TypeController(DataContext context)
        {
            _context = context;
        }

    }
}