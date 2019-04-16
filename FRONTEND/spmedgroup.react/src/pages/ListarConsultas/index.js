import React, { Component } from 'react';
import './index.css';
import img1 from '../../assets/images/icon-login.png';
import { sair } from '../../services/auth';
import jwt_decode from 'jwt-decode';

class ListarConsultas extends Component {

    constructor() {
        super();

        this.state = {
            lista: []
        }
    }

    buscarConsultas() {

        let token = localStorage.getItem('usuario-spmed');

        fetch('http://localhost:5000/api/consultas', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lista: data }))
            .catch(erro => console.log("Erro: ", erro))
    }

    componentDidMount() {
        this.buscarConsultas()
    }

    logout() {
        console.log('ei')
        sair();
        this.props.history.push('/');
    }

    render() {

        let token_undecoded = localStorage.getItem('usuario-spmed');
        let token_decoded = jwt_decode(token_undecoded);

        return (
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
                            <a href="#">{token_decoded.email}</a>
                            <a onClick={this.logout.bind(this)}>Sair</a>
                            <a href="#"><i className="fas fa-user-circle"></i></a>
                        </div>
                    </div>
                    <div className="container__card">
                        {
                            this.state.lista.map(function (element) {
                                return (
                                    <div className="card" key={element.id}>
                                        <header className="header__two">
                                            <span>{token_decoded.email}</span>
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