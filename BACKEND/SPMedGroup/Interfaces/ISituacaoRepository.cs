using SpMedGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.Interfaces
{
    interface ISituacaoRepository
    {
        List<Situacao> Listar();
    }
}
