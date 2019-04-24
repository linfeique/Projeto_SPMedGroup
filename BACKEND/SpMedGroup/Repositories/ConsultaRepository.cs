﻿using Microsoft.EntityFrameworkCore;
using SpMedGroup.Domains;
using SPMedGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        public void Alterar(Consultas consulta)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Consultas.Update(consulta);
                ctx.SaveChanges();
            }
        }

        public Consultas BuscarPorId(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                Consultas consultaProcurada = ctx.Consultas.Find(id);

                if (consultaProcurada == null)
                {
                    return null;
                }

                return consultaProcurada;
            }
        }

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
                return ctx.Consultas.Include(x => x.IdMedicoNavigation).ToList();
            }
        }

        public List<Consultas> ListarConsultasMedico(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Consultas.Include(x => x.IdMedicoNavigation).Where(x => x.IdMedicoNavigation.IdUsuario == id).ToList();
            }
        }

        public List<Consultas> ListarConsultasPaciente(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                //return ctx.Consultas.Where(x => x.IdPacienteNavigation.IdUsuario == id).ToList();
                return ctx.Consultas.Include(x => x.IdMedicoNavigation).Where(x => x.IdPacienteNavigation.Id == id).ToList();
            }
        }
    }
}
