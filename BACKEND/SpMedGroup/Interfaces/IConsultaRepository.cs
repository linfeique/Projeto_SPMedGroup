using SpMedGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Interfaces
{
    interface IConsultaRepository
    {
        List<Consultas> Listar();

        void Cadastrar(Consultas consulta);

        List<Consultas> ListarConsultasMedico(int id);

        List<Consultas> ListarConsultasPaciente(int id);

        void Alterar(Consultas consulta);

        Consultas BuscarPorId(int id);

        void Deletar(Consultas consulta);
    }
}
