using System;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.Domains;
using SpMedGroup.Interfaces;
using SpMedGroup.Repositories;

namespace SpMedGroup.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasMongoController : ControllerBase
    {
        private IConsutaMongoRepository consutaMongo { get; set; }

        public ConsultasMongoController()
        {
            consutaMongo = new ConsutaMongoRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(ConsultasMongo consulta)
        {
            try
            {
                consutaMongo.Cadastrar(consulta);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(consutaMongo.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}