using SPMedGroup.Domains;
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

        public List<Medicos> Listar()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Medicos.ToList();
            }
        }
    }
}
