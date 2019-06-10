using SpMedGroup.Domains;
using System.Collections.Generic;

namespace SpMedGroup.Interfaces
{
    interface IConsutaMongoRepository
    {
        void Cadastrar(ConsultasMongo consulta);

        List<ConsultasMongo> Listar();
    }
}
