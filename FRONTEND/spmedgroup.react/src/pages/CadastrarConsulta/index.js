import React, { Component } from 'react';
import './index.css';
import { sair } from '../../services/auth';
import img from '../../assets/images/icon-login.png';
import MenuAdmin from '../../Components/MenuAdmin/Menu';
import MenuComum from '../../Components/MenuComum/Menu';
import BarraPerfil from '../../Components/BarraPerfil/BarraPerfil';
import jwt_decode from 'jwt-decode';

class CadastroConsulta extends Component{

    constructor(){
        super();

        this.state = {
            idMedico: null,
            idPaciente: null,
            listaMedicos: [],
            listaPacientes: [],
            data: '',
            hora: '',
            dataConsulta: '',
            endereco: '',
            latitude: '',
            longitude: ''
        }
    }

    buscarPacientesPorId(){

        let pront = {
            id: 10
        };

        fetch('http://192.168.3.93:5000/api/pacientes/buscarporid', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pront)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({endereco : data.endereco});
            this.buscarLatLon();
        })
        .catch(erro => console.log('Erro: ', erro))
    }

    buscarLatLon(){
        let endereco2 = this.state.endereco;
        let enderecoCorreto = endereco2.replace(/ /g, '+');
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ enderecoCorreto +'&key=AIzaSyAMJX3iTSJgfsI7fBwaeF0LsC2PdiAZID0')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(erro => console.log('Erro: ', erro))
    }

    logout(){
        sair();
        this.props.history.push('/');
    }

    buscarMedicos(){
        fetch('http://192.168.3.93:5000/api/medicos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => this.setState({listaMedicos : data}))
        .catch(erro => console.log('Erro: ', erro))
    }

    buscarPacientes(){
        fetch('http://192.168.3.93:5000/api/pacientes', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed')
            }
        })
        .then(res => res.json())
        .then(data => this.setState({listaPacientes : data}))
        .catch(erro => console.log('Erro: ', erro))
    }

    componentDidMount(){
        this.buscarPacientes();
        this.buscarMedicos();
        this.buscarPacientesPorId();
    }

    atualizaEstadoMedico(event){
        this.setState({idMedico : event.target.value})
    }

    atualizaEstadoPaciente(event){
        this.setState({idPaciente : event.target.value})
    }

    atualizaEstadoData(event){
        this.setState({data : event.target.value})
    }

    atualizaEstadoHora(event){
        this.setState({hora : event.target.value})
    }

    atualizaEstadoDataHoraConsulta(){
        this.setState({dataConsulta: this.state.data + 'T' + this.state.hora})
    }

    agendaConsulta(event){
        event.preventDefault();

        let consulta = {
            idPaciente: this.state.idPaciente,
            idMedico: this.state.idMedico,
            idSituacao: 3,
            dataConsulta: this.state.dataConsulta
        }

        fetch('http://192.168.3.93:5000/api/consultas', {
            method: 'POST',
            body: JSON.stringify(consulta),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed')
            }
        })
        .then(res => {
            if(res.status == 200){
                alert('Consulta cadastrada com sucesso');
            } else{
                alert('Algo está inválido');
            }
        })
        .then(data => console.log(data))
        .catch(erro => console.log('Erro: ', erro))
    }

    render(){
        let token_undecoded = localStorage.getItem('usuario-spmed');
        let token_decoded = jwt_decode(token_undecoded);
        return(
            <div className="body">
                {
                    (10 > 5) ? <MenuAdmin /> : <MenuComum />
                }
                <div className="register_lado_direito">
                    <BarraPerfil />

                    <div className="box">
                        <div className="alyasar">
                            <img src={img} />
                        </div>
                        <div>
                            <form className="haq" onSubmit={this.agendaConsulta.bind(this)}>
                                <select value={this.state.idMedico} onChange={this.atualizaEstadoMedico.bind(this)} required>
                                    <option>Selecione um médico</option>
                                    {
                                        this.state.listaMedicos.map(function(element){
                                            return(
                                                <option value={element.id} key={element.id}>{element.nome}</option>
                                            );
                                        })
                                    }
                                </select>

                                <select value={this.state.idPaciente} onChange={this.atualizaEstadoPaciente.bind(this)} required>
                                    <option>Selecione o paciente</option>
                                    {
                                        this.state.listaPacientes.map(function(element){
                                            return(
                                                <option value={element.id} key={element.id}>{element.nome}</option>
                                            );
                                        })
                                    }
                                </select>

                                <input 
                                    className="register__data" 
                                    type="date"
                                    placeholder="Data de Consulta" 
                                    value={this.state.data} 
                                    onChange={this.atualizaEstadoData.bind(this)}
                                    required
                                />
                                <input 
                                    className="register__data" 
                                    type="time"
                                    placeholder="Hora da Consulta" 
                                    value={this.state.hora}
                                    onChange={this.atualizaEstadoHora.bind(this)}
                                    required
                                />

                                <input 
                                    className="register__btn" 
                                    type="submit" 
                                    value="Agendar"
                                    onClick={this.atualizaEstadoDataHoraConsulta.bind(this)}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CadastroConsulta