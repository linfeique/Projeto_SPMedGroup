using SpMedGroup.Domains;
using SPMedGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        public Medicos BuscarMedicoPorIdUsuario(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Medicos medicoProcurado = ctx.Medicos.Find(id);

                if (medicoProcurado == null)
                {
                    return null;
                }

                return medicoProcurado;
            }
        }

        public List<Medicos> ListarMedicosPorEspecialidade(string especialidade)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                List<Medicos> ListaMedicos = ctx.Medicos.Where(x => x.IdEspecialidadeNavigation.Nome == especialidade).ToList();

                if (ListaMedicos == null)
                {
                    return null;
                }

                return ListaMedicos;
            }
        }

        public void Cadastrar(Medicos medico)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Medicos.Add(medico);
                ctx.SaveChanges();
            }
        }

        public List<Medicos> Listar()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Medicos.ToList();
            }
        }

        public Medicos BuscarPorIdUsuario(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Medicos medicoP = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == id);

                if (medicoP == null)
                {
                    return null;
                }

                return medicoP;
            }
        }
    }
}
