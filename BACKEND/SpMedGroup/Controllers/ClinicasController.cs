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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository ClinicaRepositorio { get; set;}

        public ClinicasController()
        {
            ClinicaRepositorio = new ClinicaRepository();
        }

        [HttpGet]
        public IActionResult ListarClinicas()
        {
            try
            {
                return Ok(ClinicaRepositorio.ListarClinicas());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}