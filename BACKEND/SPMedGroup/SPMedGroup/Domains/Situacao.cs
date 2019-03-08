using System;
using System.Collections.Generic;

namespace SPMedGroup.Domains
{
    public partial class Situacao
    {
        public Situacao()
        {
            Consultas = new HashSet<Consultas>();
        }

        public int Id { get; set; }
        public string Situacao1 { get; set; }

        public ICollection<Consultas> Consultas { get; set; }
    }
}
