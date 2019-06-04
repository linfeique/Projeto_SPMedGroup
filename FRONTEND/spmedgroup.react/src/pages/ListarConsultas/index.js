import React, { Component } from 'react';
import './index.css';
import jwt_decode from 'jwt-decode';
import BarraPerfil from '../../Components/BarraPerfil/BarraPerfil';
import MenuAdmin from '../../Components/MenuAdmin/Menu';
import MenuComum from '../../Components/MenuComum/Menu';
import ModalEspec from '../../Components/ModalEspecificacoes/index';

class ListarConsultas extends Component {

    constructor() {
        super();

        this.state = {
            lista: []
        }
    }

    buscarConsultas() {

        let token = localStorage.getItem('usuario-spmed');

        fetch('http://192.168.3.93:5000/api/consultas', {
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

    openButton(){
        return(<ModalEspec />);
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
                            this.state.lista.map((element) => {
                                return (
                                    <div className="card" key={element.id}>
                                        
                                        <header className="header__two">
                                            <p>Médico: { element.idMedicoNavigation != null ? element.idMedicoNavigation.nome : ""}</p>
                                            <a href="#">Situação atual: Agendada | Mudar Situação</a>
                                        </header>
                                        <main className="main__two">
                                            <p>{element.descricao}</p>
                                        </main>
                                        <footer className="footer__two">
                                            <div className="data">
                                                <span>{element.dataConsulta}</span>
                                            </div>
                                            <div>
                                                <button className="btn__list">Atualizar Descrição</button>
                                                <button className="btn__list" onClick={this.openButton.bind(this)}>Saiba Mais</button>
                                            </div>
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