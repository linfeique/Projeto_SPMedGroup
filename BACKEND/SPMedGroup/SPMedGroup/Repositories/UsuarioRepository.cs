using Microsoft.EntityFrameworkCore;
using SPMedGroup.Domains;
using SPMedGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public void Alterar(Usuarios usuario)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Usuarios.Update(usuario);
                ctx.SaveChanges();
            }
        }

        public Usuarios BuscarPorEmailSenha(string email, string senha)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Usuarios usuarioProcurado = ctx.Usuarios.FirstOrDefault(x => x.Email == email && x.Senha == senha);

                if (usuarioProcurado == null)
                {
                    return null;
                }

                return usuarioProcurado;
            }
        }

        public void Cadastrar(Usuarios usuario)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
        }

        public void Deletar(Usuarios usuario, int id)
        {
            throw new NotImplementedException();
        }

        public List<Usuarios> ListarUsuarios()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                List<Usuarios> usuarios = ctx.Usuarios.ToList();
                return usuarios;
            }
        }
    }
}
