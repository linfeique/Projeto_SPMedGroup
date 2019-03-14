using SpMedGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.Interfaces
{
    interface IPacienteRepository
    {
        void Cadastrar(Pacientes paciente);

        List<Pacientes> Listar();

        Pacientes BuscarPorRG(string rg);
    }
}
