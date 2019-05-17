using SpMedGroup.Domains;
using SpMedGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.Repositories
{
    public class SituacaoRepository : ISituacaoRepository
    {
        public List<Situacao> Listar()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Situacao.ToList();
            }
        }
    }
}
