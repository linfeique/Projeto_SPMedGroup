using System;
using System.Collections.Generic;

namespace SPMedGroup.Domains
{
    public partial class Consultas
    {
        public int Id { get; set; }
        public int? IdPaciente { get; set; }
        public int? IdMedico { get; set; }
        public int? IdSituacao { get; set; }
        public DateTime DataConsulta { get; set; }
        public string Descricao { get; set; }

        public Medicos IdMedicoNavigation { get; set; }
        public Situacao IdSituacaoNavigation { get; set; }
    }
}
