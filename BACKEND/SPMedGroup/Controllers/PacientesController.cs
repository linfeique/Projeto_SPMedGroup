using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.Domains;
using SpMedGroup.Interfaces;
using SpMedGroup.Repositories;

namespace SpMedGroup.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {

        private IPacienteRepository pacienteRepositorio { get; set; }

        public PacientesController()
        {
            pacienteRepositorio = new PacienteRepository();
        }

        [HttpPost("buscarporusuario")]
        public IActionResult BuscarPorIdUsuario(Pacientes paciente)
        {
            try
            {
                Pacientes pacienteP = pacienteRepositorio.BuscarPorIdUsuario(paciente.IdUsuarioNavigation.Id);

                if (pacienteP == null)
                {
                    return NotFound();
                }

                return Ok(pacienteP);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(pacienteRepositorio.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Cadastrar(Pacientes paciente)
        {
            try
            {
                pacienteRepositorio.Cadastrar(paciente);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet("BuscarPorRG")]
        public IActionResult BuscarPorRG(Pacientes paciente)
        {
            try
            {
                Pacientes pacienteProcurado = pacienteRepositorio.BuscarPorRG(paciente.Rg);

                if (pacienteProcurado == null)
                {
                    return NotFound();
                }

                return Ok(pacienteProcurado);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost("buscarporid")]
        public IActionResult BuscarPorId(Pacientes paciente)
        {
            try
            {
                Pacientes pacienteProcurado = pacienteRepositorio.BuscarPorId(paciente.Id);

                if (pacienteProcurado == null)
                {
                    return NotFound();
                }

                return Ok(pacienteProcurado);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}