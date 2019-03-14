using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.Domains;
using SpMedGroup.Util;
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
                int id = Convert.ToInt32(HttpContext.User.Claims.First(x => x.Type == "IdUsuario").Value);

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

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Cadastrar(Consultas consulta)
        {
            try
            {

                EnviarEmail evn = new EnviarEmail();

                consultaRepositorio.BuscarUsuarioPorIdConsulta(consulta.IdPacienteNavigation.IdUsuarioNavigation.Id);

                evn.Execute(consulta.IdPacienteNavigation.IdUsuarioNavigation.Email);
                
                consultaRepositorio.Cadastrar(consulta);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Médico")]
        [HttpPut("AlterarDescricao")]
        public IActionResult AlterarAdmin(Consultas consulta)
        {
            try
            {
                Consultas consultaASerAlterada = consultaRepositorio.BuscarPorId(consulta.Id);

                if (consultaASerAlterada.Descricao == null)
                {
                    return BadRequest("Insira a descrição");
                }

                consultaASerAlterada.Descricao = consulta.Descricao;

                consultaRepositorio.Alterar(consultaASerAlterada);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut("AlterarSituacao")]
        public IActionResult Alterar(Consultas consulta)
        {
            try
            {
                Consultas consultaASerAlterada = consultaRepositorio.BuscarPorId(consulta.Id);

                consultaASerAlterada.IdSituacao = consulta.IdSituacao;

                consultaRepositorio.Alterar(consultaASerAlterada);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}