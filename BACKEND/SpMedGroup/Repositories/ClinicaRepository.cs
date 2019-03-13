using Microsoft.EntityFrameworkCore;
using SpMedGroup.Domains;
using SPMedGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        public List<Clinica> ListarClinicas()
        {
            using (SpMedGroupContext ctx = new SpMedGroupContext())
            {
                return ctx.Clinica.Include(x => x.Medicos).ToList();
            }
        }
    }
}
