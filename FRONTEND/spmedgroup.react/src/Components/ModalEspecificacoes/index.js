import React, { Component } from 'react';
import './index';

export default class ModalEspecificacoes extends Component {

    closeButton(event){
        event.preventDefault();

        var teste = document.getElementsByClassName('modal__body');

        teste.style.display = 'none';
    }

    render(){
        return(
            <div className="modal__body">
                <header className="modal__head">
                    <span>Especificações</span>
                    <span>Bruno Salles</span>
                </header>
                <main className="modal__content">
                    <div className="modal__text1">
                        <span className="modal__paciente">Bruno Salles</span>
                        <span className="modal__medico">Vini Berrius</span>
                    </div>
                    <div className="modal__text2">
                        <span className="modal__status">Agendada</span>
                        <span className="modal__obs">Consulta seila seila</span>
                    </div>
                </main>
                <footer className="modal__below">
                    <button className="modal__btn_close" onClick={this.closeButton.bind(this)}>Ok, Entendi</button>
                </footer>
            </div>
        );
    }
}