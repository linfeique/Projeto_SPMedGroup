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

    constructor(props) {
        super(props);

        this.state = {
            listaEspecialidade: [],
            especialidade: undefined,
            genero: '',
            dataCriacao: '',
            idade: undefined,
            doenca: '',
            consultaAll: {},
            lat: '',
            lng: '',
            latLong: {}
        }
    }

    buscarEspecialidade() {
        fetch('http://192.168.3.93:5000/api/especialidades', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => this.setState({ listaEspecialidade: data }))
            .catch(erro => console.log('Erro: ', erro))
    }

    atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        this.buscarEspecialidade();
    }

    atualizarConsulta(event) {
        event.preventDefault();

        let date = new Date().getTime();

        let consulta = {
            doenca: this.state.doenca,
            latitude: this.state.lat,
            longitude: this.state.lng,
            idade: this.state.idade,
            genero: this.state.genero,
            dataCriacao: new Date(date),
            especialidade: this.state.especialidade,
            idconsulta: this.props.consulta
        }

        fetch('http://192.168.3.93:5000/api/consultasmongo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consulta)
        })
            .then(res => {
                if(res.status == 200){
                    alert("Consulta atualizada com sucesso")
                }
            })
            .then(data => console.log(data))
            .catch(erro => {
                if(erro.response.status == 400){
                    alert("Algo está inválido")
                }
            })
    }

    buscarIdConsulta(a) {

        if (a != 0) {

            let teste = {
                // id: this.props.consulta
                id: a
            };

            fetch('http://192.168.3.93:5000/api/consultas/buscarporid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed')
                },
                body: JSON.stringify(teste)
            })
                .then(res => { return res.json() })
                .then(data => { this.setState({ consultaAll: data }); this.buscarLatLong(); })
                .catch(erro => console.log("Erro: ", erro))
        }
    }

    componentWillReceiveProps(props) {
        this.buscarIdConsulta(props.consulta);
    }

    buscarLatLong() {
        let consulta = this.state.consultaAll;
        let objetoConsulta = consulta.idPacienteNavigation.endereco;

        let transform = objetoConsulta.replace(/ /g, "+");

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ transform +'&key=AIzaSyAMJX3iTSJgfsI7fBwaeF0LsC2PdiAZID0')
        .then(res => res.json())
        .then((data) => {
            data.results.forEach(element => {
                this.setState({
                    lat: element.geometry.location.lat,
                    lng: element.geometry.location.lng,
                    latLong: element.geometry.location
                })
            });
        })
        .catch(erro => console.log("Erro: ", erro))

        let teste = this.state.lat + " " + this.state.lng;
    }

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
                                <select required style={select__header__espec} name="especialidade" value={this.state.especialidade} onChange={this.atualizaEstado.bind(this)}>
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
                                <select required style={select__header__genero} name="genero" value={this.state.genero} defaultValue="Masculino" onChange={this.atualizaEstado.bind(this)}>
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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