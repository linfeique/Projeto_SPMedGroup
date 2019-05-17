using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.Interfaces;
using SpMedGroup.Repositories;

namespace SpMedGroup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class SituacaoController : ControllerBase
    {
        private ISituacaoRepository situacaoRepositorio { get; set; }

        public SituacaoController()
        {
            situacaoRepositorio = new SituacaoRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(situacaoRepositorio.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}