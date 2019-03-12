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
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository usuarioRepositorio { get; set;}

        public UsuariosController()
        {
            usuarioRepositorio = new UsuarioRepository();
        }

        [HttpGet]
        public IActionResult ListarUsuarios()
        {
            try
            {
                return Ok(usuarioRepositorio.ListarUsuarios());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Cadastrar(Usuarios usuario)
        {
            try
            {
                usuarioRepositorio.Cadastrar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Você não está logado");
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete]
        public IActionResult Excluir(Usuarios usuario)
        {
            try
            {
                usuarioRepositorio.Deletar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}