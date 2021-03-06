﻿using SpMedGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Interfaces
{
    interface IClinicaRepository
    {
        List<Clinica> ListarClinicas();

        void Cadastrar(Clinica clinica);
    }
}
