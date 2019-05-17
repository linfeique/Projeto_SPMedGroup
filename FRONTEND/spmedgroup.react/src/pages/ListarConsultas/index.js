import React, { Component } from 'react';
import './index.css';
import jwt_decode from 'jwt-decode';
import BarraPerfil from '../../Components/BarraPerfil/BarraPerfil';
<<<<<<< HEAD
import MenuAdmin from '../../Components/MenuAdmin/Menu';
import MenuComum from '../../Components/MenuComum/Menu';
=======
import Menu from '../../Components/Menu/Menu';
import MenuComum from '../../Components/Menu/MenuComum';
import ModalEspec from '../../Components/ModalEspecificacoes/index';
>>>>>>> d1d30ea32a9328b3ae494c5d66a73c7afb8a0b08

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
<<<<<<< HEAD
                    (
                        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" 
                        == 
                        'Médico' 
                        || 
                        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                        ==
                        'Paciente'
                        ) ? <MenuComum /> : <MenuAdmin />
=======
                    (token_decoded.tipoUsuarioReact == "Administrador") ? <Menu /> : <MenuComum />
>>>>>>> d1d30ea32a9328b3ae494c5d66a73c7afb8a0b08
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