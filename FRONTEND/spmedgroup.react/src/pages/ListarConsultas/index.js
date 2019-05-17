import React, { Component } from 'react';
import './index.css';
import jwt_decode from 'jwt-decode';
import BarraPerfil from '../../Components/BarraPerfil/BarraPerfil';
import MenuAdmin from '../../Components/MenuAdmin/Menu';
import MenuComum from '../../Components/MenuComum/Menu';

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

        console.log(token_decoded);

        return (
            <div className="body">
                {
                    (
                        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" 
                        == 
                        'Médico' 
                        || 
                        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                        ==
                        'Paciente'
                        ) ? <MenuComum /> : <MenuAdmin />
                }
                <div className="lado_direito">
                    <BarraPerfil />
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