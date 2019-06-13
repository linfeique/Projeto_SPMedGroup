using MongoDB.Driver;
using SpMedGroup.Domains;
using SpMedGroup.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace SpMedGroup.Repositories
{
    public class ConsutaMongoRepository : IConsutaMongoRepository
    {
        private readonly IMongoCollection<ConsultasMongo> _consultas;
 
        public ConsutaMongoRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("spmedgroupmongo");
            _consultas = database.GetCollection<ConsultasMongo>("consultas");
        }

        public ConsultasMongo BuscarPorIdConsulta(int id)
        {
            ConsultasMongo consulta = _consultas.Find(x => x.IdConsulta == id.ToString()).FirstOrDefault();

            if (consulta == null)
            {
                return null;
            }

            return consulta;
        }

        public void Cadastrar(ConsultasMongo consulta)
        {
            _consultas.InsertOne(consulta);
        }

        public List<ConsultasMongo> Listar()
        {
            return _consultas.Find(_ => true).ToList();
        }
    }
}
