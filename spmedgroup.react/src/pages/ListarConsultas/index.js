import React, { Component } from 'react';
import './index.css';
import img1 from '../../assets/images/icon-login.png';
import axios from 'axios';

class ListarConsultas extends Component{

    constructor(){
        super();

        this.state = {
            lista : []
        }
    }

    buscarConsultas(){

        let token = localStorage.getItem('usuario-spmed');
        const header = 'Authorization: Bearer ' + token;

        // axios.get(`http://localhost:5000/api/consultas`, { headers : { header } })
        //     .then(res => {
        //         const consultas = res.data;
        //         this.setState({ lista : consultas });
        // })

        fetch('http://localhost:5000/api/consultas', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(resposta => resposta.json())
        .then(data => this.setState({lista : data}))
        .catch(erro => console.log("Erro: ", erro))
    }

    componentDidMount(){
        this.buscarConsultas()
    }

    render(){
        return(
            <div className="body">
                <div className="lado_esquerdo">
                    <header className="header">
                        <div className="contain_logo">
                            <img src={img1} />
                        </div>
                    </header>
                    <main>
                        <ul className="menu">
                            <li>Página Inicial</li>
                            <li>Cadastrar Médicos</li>
                            <li>Cadastrar Pacientes</li>
                            <li>Relatório de Consultas</li>
                            <li>Agendar Consultas</li>
                        </ul>
                    </main>
                    <footer className="footer">
                        <p>Todos os Direitos Reservados</p>
                    </footer>
                </div>
                <div className="lado_direito">
                    <div className="barra_perfil">
                        <div className="left">
                            <a href="#">SpMedGroup</a>
                        </div>
                        <div className="right">
                            <a href="#">Bruno Salles</a>
                            <a href="#">Sair</a>
                            <a href="#"><i className="fas fa-user-circle"></i></a>
                        </div>
                    </div>
                    <div className="container__card">
                        {
                            this.state.lista.map(function(element){
                                return(
                                    <div className="card" key={element.id}>
                                        <header className="header__two">
                                            <span>{element.nome}</span>
                                            <a href="#">Mudar Situação</a>
                                        </header>
                                        
                                        <main className="main__two">
                                            <p>{element.descricao}</p>
                                        </main>
                                        <footer className="footer__two">
                                            <div className="data">
                                                <span>{element.dataConsulta}</span>
                                            </div>
                                            <button className="btn__list">Saiba Mais</button>
                                        </footer>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ListarConsultas