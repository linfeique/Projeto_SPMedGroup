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

        public Medicos BuscarMedicosPorEspecialidade(string especialidade)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Medicos medico = ctx.Medicos.FirstOrDefault(x => x.IdEspecialidadeNavigation.Nome == especialidade);

                if (medico == null)
                {
                    return null;
                }

                return medico;
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

        public List<Medicos> ListarMedicosPorEspecialidade()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                List<Medicos> ListaMedicos = Listar();
                Medicos medicos = new Medicos();

                foreach (Medicos item in ListaMedicos)
                {
                    medicos = BuscarMedicosPorEspecialidade(item.IdEspecialidadeNavigation.Nome);

                    ListaMedicos.Add(medicos);
                }

                return ListaMedicos;
            }
        }
    }
}
