﻿using SpMedGroup.Domains;
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

        List<Medicos> ListarMedicosPorEspecialidade(string especialidade);

        void Cadastrar(Medicos medico);

        Medicos BuscarPorIdUsuario(int id);
    }
}
