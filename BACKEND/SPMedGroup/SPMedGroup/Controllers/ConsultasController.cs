using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPMedGroup.Domains;
using SPMedGroup.Interfaces;
using SPMedGroup.Repositories;

namespace SPMedGroup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository consultaRepositorio { set; get; }

        public ConsultasController()
        {
            consultaRepositorio = new ConsultaRepository();
        }

        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                // primeiro - pegar o id do usuário logado
                int id = Convert.ToInt32(HttpContext.User.Claims.First(x => x.Type == JwtRegisteredClaimNames.Jti).Value);

                string role = HttpContext.User.Claims.First(x => x.Type == ClaimTypes.Role).Value;

                // dúvida: ele é médico ou paciente?
                // se médico,você terá um repository que liste as consultas daquele médico
                if (role == "Médico")
                {
                    return Ok(consultaRepositorio.ListarConsultasMedico(id));
                }
                else if (role == "Paciente")
                {
                    return Ok(consultaRepositorio.ListarConsultasPaciente(id));
                }
                else
                {
                    return Ok(consultaRepositorio.Listar());
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize("Administrador")]
        [HttpPost]
        public IActionResult Cadastrar(Consultas consulta)
        {
            try
            {
                consultaRepositorio.Cadastrar(consulta);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}