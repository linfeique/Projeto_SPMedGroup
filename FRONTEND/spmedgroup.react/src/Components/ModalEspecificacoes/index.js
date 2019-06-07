import React, { Component } from 'react';
import './index';

const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 300,
};

const modalStyle = {
    backgroundColor: '#FFF',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30,
    position: 'relative'
};

const footerStyle = {
    position: 'absolute',
    bottom: 20
};

const headerStyle = {
    color: "#000"
};

const label = {
    color: "#000"
};

const mainStyle = {

};

const input__header = {

};

const select__header__espec = {

}

const select__header__genero = {

};

const input__middle = {

};

const input__end = {

};

export default class ModalEspecificacoes extends Component {
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render(){
        if(!this.props.show){
            return null;
        }
        return(
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    <div style={headerStyle}>
                        Atualizar Consulta
                    </div>
                    <div style={mainStyle}>
                        <div style={input__header}>
                            <label htmlFor="espec" style={label}>Especialidade do Médico</label>
                            <select style={select__header__espec} id="espec">
                                <option>a</option>
                                <option>b</option>
                                <option>c</option>
                            </select>

                            <label htmlFor="genero" style={label}>Selecione o Gênero</label>
                            <select style={select__header__genero} id="genero">
                                <option>Masculino</option>
                                <option>Feminino</option>
                                <option>Indefinido</option>
                            </select>
                        </div>
                        <div style={input__middle}>
                            <label htmlFor="dataConsulta" style={label}>Data da Consulta</label>
                            <input type="date" id="dataConsulta"/>

                            <label htmlFor="idade" style={label}>Idade do Paciente</label>
                            <input type="text" id="idade" />

                            <label htmlFor="doenca" style={label}>Doença do Paciente</label>
                            <input type="text" id="doenca"/>
                        </div>
                        <div style={input__end}>
                            <label htmlFor="longitude" style={label}>Longitude do Paciente</label>
                            <input type="text" id="longitude"/>

                            <label htmlFor="latitude" style={label}>Latitude do Paciente</label>
                            <input type="text" id="latitude" />
                        </div>
                    </div>
                    <div style={footerStyle}>
                        <button onClick={(e) => { this.onClose(e) }}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}