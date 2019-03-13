using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.Domains;
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

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Cadastrar(Clinica clinica)
        {
            try
            {
                ClinicaRepositorio.Cadastrar(clinica);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}