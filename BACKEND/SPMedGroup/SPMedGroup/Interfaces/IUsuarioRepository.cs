﻿using SPMedGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedGroup.Interfaces
{
    interface IUsuarioRepository
    {
        List<Usuarios> ListarUsuarios();

        void Cadastrar(Usuarios usuario);

        void Alterar(Usuarios usuario);

        void Deletar(Usuarios usuario, int id);

        Usuarios BuscarPorEmailSenha(string email, string senha);
    }
}
