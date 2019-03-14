using SpMedGroup.Domains;
using SpMedGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        public void Cadastrar(Pacientes paciente)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Pacientes.Add(paciente);
                ctx.SaveChanges();
            }
        }

        public List<Pacientes> Listar()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Pacientes.ToList();
            }
        }

        public Pacientes BuscarPorRG(string rg)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Pacientes paciente = ctx.Pacientes.FirstOrDefault(x => x.Rg == rg);

                if (paciente == null)
                {
                    return null;
                }

                return paciente;
            }
        }
    }
}
