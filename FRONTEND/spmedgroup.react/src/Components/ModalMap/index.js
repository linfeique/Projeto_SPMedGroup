import React, { Component } from 'react';

export default class ModalMap extends Component{
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    <div style={headerStyle}>
                        Atualizar Consulta {this.props.consulta}
                    </div>
                    <div style={mainStyle}>
                        <div style={input__header}>
                            <div style={input__header__one}>
                                <label htmlFor="espec" style={label}>Especialidade do Médico</label>
                                <select style={select__header__espec} name="especialidade" value={this.state.especialidade} onChange={this.atualizaEstado.bind(this)}>
                                    {
                                        this.state.listaEspecialidade.map((e) => {
                                            return (
                                                <option value={e.id} key={e.id}>{e.nome}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div style={input__header__one}>
                                <label htmlFor="genero" style={label}>Selecione o Gênero</label>
                                <select style={select__header__genero} name="genero" value={this.state.genero} defaultValue="Masculino" onChange={this.atualizaEstado.bind(this)}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Indefinido">Indefinido</option>
                                </select>
                            </div>
                        </div>

                        <div style={input__middle}>
                            <div style={input__middle__one}>
                                <label htmlFor="dataConsulta" style={label}>Data da Consulta</label>
                                <input
                                    type="date"
                                    id="dataConsulta"
                                    name="dataConsulta"
                                    value={this.state.dataConsulta}
                                    onChange={this.atualizaEstado.bind(this)}
                                    style={input__middle__data}
                                />
                            </div>
                            <div style={input__middle__one}>
                                <label htmlFor="idade" style={label}>Idade do Paciente</label>
                                <input
                                    type="text"
                                    id="idade"
                                    name="idade"
                                    value={this.state.idade}
                                    onChange={this.atualizaEstado.bind(this)}
                                    style={input__middle__idade}
                                    placeholder="Digite a idade do paciente"
                                />
                            </div>
                            <div style={input__middle__one}>
                                <label htmlFor="doenca" style={label}>Doença do Paciente</label>
                                <input
                                    type="text"
                                    id="doenca"
                                    name="doenca"
                                    value={this.state.doenca}
                                    onChange={this.atualizaEstado.bind(this)}
                                    style={input__middle__idade}
                                    placeholder="Digite a doença do paciente"
                                />
                            </div>
                        </div>

                        <div style={input__end}>
                            <div style={input__end__one}>
                                <label htmlFor="longitude" style={label}>Longitude do Paciente</label>
                                <input
                                    type="text"
                                    id="longitude"
                                    name="longitude"
                                    value={this.state.lng}
                                    onChange={this.atualizaEstado.bind(this)}
                                    style={input__end__local}
                                    placeholder="Digite a longitude"
                                />
                            </div>

                            <div style={input__end__one}>
                                <label htmlFor="latitude" style={label}>Latitude do Paciente</label>
                                <input
                                    type="text"
                                    id="latitude"
                                    name="latitude"
                                    value={this.state.lat}
                                    onChange={this.atualizaEstado.bind(this)}
                                    style={input__end__local}
                                    placeholder="Digite a latitude"
                                />
                            </div>
                        </div>
                    </div>
                    <div style={footerStyle}>
                        <button style={footerStyle__btn__one} onClick={this.atualizarConsulta.bind(this)}>
                            Salvar Alterações
                        </button>
                        <button
                            onClick={(e) => {
                                this.onClose(e)
                                this.setState({
                                    doenca: '',
                                    latitude: '',
                                    longitude: '',
                                    idade: undefined,
                                    genero: '',
                                    dataCriacao: '',
                                    especialidade: '',
                                    consultaAll: {}
                                })
                            }}
                            style={footerStyle__btn__two}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}