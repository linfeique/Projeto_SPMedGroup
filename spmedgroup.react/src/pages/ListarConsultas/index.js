import React, { Component } from 'react';
import './index.css';
import img1 from '../../assets/images/icon-login.png';

class ListarConsultas extends Component{
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
                <div className="lado_direito">
                    <div className="card">
                        <header className="header__two">
                            <span>Bruno Salles</span>
                            <a href="#">Mudar Situação</a>
                        </header>
                        <main className="main__two">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </main>
                        <footer className="footer__two">
                            <div className="data">
                                <span>24/06/2006</span>
                            </div>
                            <button className="btn__list">Saiba Mais</button>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListarConsultas