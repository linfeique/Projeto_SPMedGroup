import React, { Component } from 'react';
import {sair} from '../../services/auth';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import './index.css';

export default class BarraPerfil extends Component{

    constructor(props){
        super(props);

        this.state = {
            nome: ''
        }
    }

    verificaToken(){
        let token_undecoded = localStorage.getItem('usuario-spmed');
        let token_decoded = jwt_decode(token_undecoded);

        if(token_decoded.tipoUsuarioReact == "Paciente"){
            console.log("TESTE1")
            this.buscarPacientes(token_decoded.IdUsuario);
        } else if(token_decoded.tipoUsuarioReact == "Médico"){
            this.buscarMedico(token_decoded.IdUsuario);
        } else {
            this.setState({nome: "Administrador"})
        }
    }

    componentDidMount(){
        this.verificaToken();
    }

    buscarPaciente(id){

        let teste = {
            IdUsuarioNavigation: {
                id: id
            }
        }

        fetch('http://192.168.1.103:5000/api/pacientes/buscarporusuario', {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("usuario-spmed")
            },
            body: JSON.stringify(teste)
        })
        .then(res => res.json())
        .then(data => this.setState({nome: data.nome}))
        .catch(erro => console.log(erro))
    }

    buscarMedico(id){
        
        let teste = {
            IdUsuarioNavigation: {
                id: id
            }
        }

        fetch('http://192.168.1.103:5000/api/medicos/buscarporusuario', {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("usuario-spmed")
            },
            body: JSON.stringify(teste)
        })
        .then(res => res.json())
        .then(data => this.setState({nome: data.nome}))
        .catch(erro => console.log(erro))
    }


    render(){
        return (
            <div className="js__barra__perfil">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />
                <div className="js__barra__left">
                    <a href="#">SpMedGroup</a>
                </div>
                <div className="js__barra__right">
                    <a href="#" className="testezao">{this.state.nome}</a>
                    <Link className="js__barra__sair" onClick={sair} to="/">Sair</Link>
                    <a href="#"><i id="testezinho" className="fas fa-user-circle"></i></a>
                </div>
            </div>
        );
    }
}