using SPMedGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Interfaces
{
    interface IMedicoRepository
    {
        Medicos BuscarMedicoPorIdUsuario(int id);

        List<Medicos> Listar();
    }
}
