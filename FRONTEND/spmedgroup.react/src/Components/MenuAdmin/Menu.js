import React, { Component } from 'react';
import img1 from '../../assets/images/icon-login.png';

export default class MenuAdmin extends Component {
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
                        <a href="#"><li>Página Inicial</li></a>
                        <a href="#"><li>Cadastrar Médicos</li></a>
                        <a href="#"><li>Cadastrar Pacientes</li></a>
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