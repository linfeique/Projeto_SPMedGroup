﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.Domains;
using SPMedGroup.Interfaces;
using SPMedGroup.Repositories;

namespace SPMedGroup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository medicoRepositorio { get; set; }

        public MedicosController()
        {
            medicoRepositorio = new MedicoRepository();
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(medicoRepositorio.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Cadastrar(Medicos medico)
        {
            try
            {
                medicoRepositorio.Cadastrar(medico);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet("ListarMedicoPorEspecialidade")]
        public IActionResult ListarMedicoPorEspecialidade(Medicos medico)
        {
            try
            {
                return Ok(medicoRepositorio.ListarMedicosPorEspecialidade());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}