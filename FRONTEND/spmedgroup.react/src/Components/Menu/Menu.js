import React, { Component } from 'react';
import img1 from '../../assets/images/icon-login.png';

export default class Menu extends Component {
    render(){
        return (
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
                        <a href="/listarConsultas"><li>Relatório de Consultas</li></a>
                        <a href="/cadastraConsulta"><li>Agendar Consultas</li></a>
                    </ul>
                </main>
                <footer className="footer">
                    <p>Todos os Direitos Reservados</p>
                </footer>
            </div>
        );
    }
}