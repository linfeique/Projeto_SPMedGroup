﻿using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using SpMedGroup.Domains;
using SpMedGroup.Repositories;
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
                Consultas consulta = ctx.Consultas
                        .Include(x => x.IdPacienteNavigation)
                        .Include(x => x.IdMedicoNavigation)
                        .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .FirstOrDefault(x => x.Id == id);

                consulta.IdPacienteNavigation.Consultas = null;
                consulta.IdMedicoNavigation.Consultas = null;
                consulta.IdSituacaoNavigation.Consultas = null;

                if (consulta == null)
                {
                    return null;
                }

                return consulta;
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

        public void Deletar(Consultas consulta)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                ctx.Consultas.Remove(consulta);
                ctx.SaveChanges();
            }
        }

        public List<Consultas> Listar()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                //return ctx.Consultas.Include(x => x.IdSituacaoNavigation).Include(x => x.IdMedicoNavigation.Consultas).ToList();
                List<Consultas> listaConsulta = ctx.Consultas
                        .Include(x => x.IdPacienteNavigation)
                        .Include(x => x.IdMedicoNavigation)
                        .Include(x => x.IdMedicoNavigation.IdUsuarioNavigation)
                        .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .ToList();
                foreach (var item in listaConsulta)
                {
                    item.IdPacienteNavigation.Consultas = null;
                    item.IdMedicoNavigation.Consultas = null;
                    item.IdSituacaoNavigation.Consultas = null;
                }
                return listaConsulta;
            }
        }

        public List<Consultas> ListarConsultasMedico(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                //return ctx.Consultas.Include(x => x.IdSituacaoNavigation).Include(x => x.IdMedicoNavigation.Consultas).Where(x => x.IdMedicoNavigation.IdUsuario == id).ToList();

                Medicos medico = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == id);
                List<Consultas> listaConsulta = ctx.Consultas

                    .Include(x => x.IdPacienteNavigation)
                    .Include(x => x.IdMedicoNavigation)
                    .Include(x => x.IdMedicoNavigation.IdUsuarioNavigation)
                    .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .Where(x => x.IdMedico == medico.Id)
                    .ToList();

                //Usar framework DAPPER                    

                foreach (var item in listaConsulta)
                {
                    item.IdPacienteNavigation.Consultas = null;
                    item.IdMedicoNavigation.Consultas = null;
                    item.IdSituacaoNavigation.Consultas = null;
                }
                return listaConsulta;
            }
        }

        public List<Consultas> ListarConsultasPaciente(int id)
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                //return ctx.Consultas.Where(x => x.IdPacienteNavigation.IdUsuario == id).ToList();
                //return ctx.Consultas.Include(x => x.IdSituacaoNavigation).Include(x => x.IdMedicoNavigation.Consultas).Where(x => x.IdPacienteNavigation.Id == id).ToList();

                Pacientes prontuario = ctx.Pacientes.Where(x => x.IdUsuario == id).FirstOrDefault();
                List<Consultas> listaConsulta = ctx.Consultas
                    .Include(x => x.IdPacienteNavigation)
                    .Include(x => x.IdMedicoNavigation)
                    .Include(x => x.IdMedicoNavigation.IdUsuarioNavigation)
                    .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .Where(x => x.IdPaciente == prontuario.Id)
                    .ToList();

                foreach (var item in listaConsulta)
                {
                    item.IdPacienteNavigation.Consultas = null;
                    item.IdMedicoNavigation.Consultas = null;
                    item.IdSituacaoNavigation.Consultas = null;
                }
                return listaConsulta;
            }
        }
    }
}
