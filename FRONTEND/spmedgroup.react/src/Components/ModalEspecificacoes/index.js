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
    maxWidth: 600,
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
    color: "#000",
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20
};

const label = {
    color: "#000",
    fontSize: 12,
    marginBottom: 5
};

const mainStyle = {

};

const input__header = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
};

const input__header__one = {
    display: 'flex',
    flexDirection: 'column'
};

const input__middle__one = {
    display: 'flex',
    flexDirection: 'column'
};

const select__header__espec = {
    width: 200,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    outline: 'none'
};

const select__header__genero = {
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    outline: 'none',
    width: 180
};

const input__middle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
};

const input__end = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60
};

const input__end__one = {
    display: 'flex',
    flexDirection: 'column'
}

const input__middle__idade = {
    width: 180,
    height: 28,
    paddingLeft: 5,
    borderRadius: 5,
    borderWidth: 1
};

const input__middle__data = {
    width: 150,
    height: 28,
    paddingLeft: 5,
    borderRadius: 5,
    borderWidth: 1
};

const input__end__local = {
    width: 180,
    height: 28,
    paddingLeft: 5,
    borderRadius: 5,
    borderWidth: 1
};

const footerStyle__btn__one = {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#38B478',
    color: '#FFF',
    cursor: 'pointer',
    marginRight: 15,
    width: 130
}

const footerStyle__btn__two = {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#7ABFCF',
    color: '#FFF',
    cursor: 'pointer',
    width: 80
}

export default class ModalEspecificacoes extends Component {
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    constructor(props){
        super(props);

        this.state = {
            listaEspecialidade: [],
            especialidade: null,
            genero: '',
            dataConsulta: '',
            idade: null,
            doenca: '',
            longitude: '',
            latitude: ''
        }
    }

    buscarEspecialidade(){
        fetch('http://192.168.1.103:5000/api/especialidades', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => this.setState({listaEspecialidade: data}))
        .catch(erro => console.log('Erro: ', erro))
    }

    atualizaEstado(event){
        this.setState({[event.target.name] : event.target.value});
    }

    componentDidMount(){
        this.buscarEspecialidade();
    }

    atualizarConsulta(event){
        event.preventDefault();

        
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
                            <div style={input__header__one}>
                                <label htmlFor="espec" style={label}>Especialidade do Médico</label>
                                <select style={select__header__espec} id="espec" value={this.state.especialidade} onChange={this.atualizaEstado.bind(this)}>
                                    {
                                        this.state.listaEspecialidade.map((e) => {
                                            return(
                                                <option id={e.id} key={e.id}>{e.nome}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div style={input__header__one}>
                                <label htmlFor="genero" style={label}>Selecione o Gênero</label>
                                <select style={select__header__genero} id="genero" value={this.state.genero} onChange={this.atualizaEstado.bind(this)}>
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
                                    value={this.state.longitude} 
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
                                    value={this.state.latitude} 
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
                        <button onClick={(e) => { this.onClose(e) }} style={footerStyle__btn__two}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}