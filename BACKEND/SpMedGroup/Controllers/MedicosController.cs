using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPMedGroup.Interfaces;
using SPMedGroup.Repositories;

namespace SPMedGroup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository medicoRepositorio { get; set; }

        public MedicosController()
        {
            medicoRepositorio = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(medicoRepositorio.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}