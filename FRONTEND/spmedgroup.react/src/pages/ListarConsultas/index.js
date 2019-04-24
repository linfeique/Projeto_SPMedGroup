import React, { Component } from 'react';
import './index.css';
import jwt_decode from 'jwt-decode';
import BarraPerfil from '../../Components/BarraPerfil/BarraPerfil';
import Menu from '../../Components/Menu/Menu';
import MenuComum from '../../Components/Menu/MenuComum';
import Axios from 'axios';

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

    render() {

        let token_undecoded = localStorage.getItem('usuario-spmed');
        let token_decoded = jwt_decode(token_undecoded);

        return (
            <div className="body">
                {
                    (token_decoded.tipoUsuarioReact == "Administrador") ? <Menu /> : <MenuComum />
                }
                <div className="lado_direito">
                    <BarraPerfil />
                    <div className="container__card">
                        {
                            this.state.lista.map((element) => {
                                return (
                                    <div className="card" key={element.id}>
                                        
                                        <header className="header__two">
                                            <p>{ element.idMedicoNavigation != null ? element.idMedicoNavigation.nome : ""}</p>
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