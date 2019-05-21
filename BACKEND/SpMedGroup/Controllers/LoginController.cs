using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SpMedGroup.Domains;
using SPMedGroup.Interfaces;
using SPMedGroup.Repositories;
using SPMedGroup.ViewModels;

namespace SPMedGroup.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository usuarioRepositorio { get; set; }
        private IMedicoRepository medicoRepositorio { get; set; }

        public LoginController()
        {
            usuarioRepositorio = new UsuarioRepository();
            medicoRepositorio = new MedicoRepository();
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuarios usuario = usuarioRepositorio.BuscarPorEmailSenha(login.Email, login.Senha);
                Medicos medico = medicoRepositorio.BuscarMedicoPorIdUsuario(usuario.Id);

                if (usuario == null)
                {
                    return NotFound("Usuario não encontrado");
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, usuario.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                    new Claim("IdUsuario", usuario.Id.ToString()),
                    new Claim(ClaimTypes.Role, usuario.IdTipoUsuarioNavigation.Tipo),
                    new Claim("tipoUsuarioReact", usuario.IdTipoUsuarioNavigation.Tipo)
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("spmedgroup-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "SpMedGroup.WebApi",
                    audience: "SpMedGroup.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}