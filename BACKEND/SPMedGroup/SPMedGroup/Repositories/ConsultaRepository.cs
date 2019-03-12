﻿using SPMedGroup.Domains;
using SPMedGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        public void Cadastrar(Consultas consulta)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Consultas.Add(consulta);
                ctx.SaveChanges();
            }
        }

        public List<Consultas> Listar()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Consultas.ToList();
            }
        }

        public List<Consultas> ListarConsultasMedico(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Consultas.Where(x => x.IdMedico == id).ToList();
            }
        }

        public List<Consultas> ListarConsultasPaciente(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Consultas.Where(x => x.IdPaciente == id).ToList();
            }
        }
    }
}
