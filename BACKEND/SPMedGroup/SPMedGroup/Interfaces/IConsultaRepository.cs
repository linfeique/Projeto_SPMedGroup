﻿using SPMedGroup.Domains;
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

        // listar consultas do médico - coluna do idMedico

        // listar consultas do paciente - coluna do idPaciente
    }
}
