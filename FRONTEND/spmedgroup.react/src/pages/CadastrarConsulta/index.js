import React, { Component } from 'react';
import './index.css';
import { sair } from '../../services/auth';
import img from '../../assets/images/icon-login.png';
import MenuAdmin from '../../Components/MenuAdmin/Menu';
import MenuComum from '../../Components/MenuComum/Menu';
import BarraPerfil from '../../Components/BarraPerfil/BarraPerfil';

class CadastroConsulta extends Component{

    constructor(){
        super();

        this.state = {
            idMecico: null,
            idPaciente: null,
            listaMedicos: [],
            listaPacientes: [],
            dataConsulta: ''
        }
    }

    logout(){
        sair();
        this.props.history.push('/');
    }

    buscarPacientes(){
        fetch('http://localhost:5000/api/medicos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => this.setState({listaMedicos : data}))
        .catch(erro => console.log('Erro: ', erro))
    }

    buscarMedicos(){
        fetch('http://localhost:5000/api/pacientes', {
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
    }

    atualizaEstadoMedico(event){
        this.setState({idMecico : event.target.value})
    }

    atualizaEstadoPaciente(event){
        this.setState({idPaciente : event.target.value})
    }

    atualizaEstadoData(event){
        this.setState({dataConsulta : event.target.value})
    }

    agendaConsulta(event){
        event.preventDefault();

        let consulta = {
            idPaciente: this.state.idPaciente,
            idMecico: this.state.idMecico,
            idSituacao: 3,
            dataConsulta: this.state.dataConsulta
        }

        fetch('http://localhost:5000/api/consultas', {
            method: 'POST',
            body: JSON.stringify(consulta),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmed')
            }
        })
        .then(res => console.log(res))
        .then(data => console.log(data))
        .catch(erro => console.log('Erro: ', erro))
    }

    render(){
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
                                <select value={this.state.idMecico} onChange={this.atualizaEstadoMedico.bind(this)}>
                                    <option>Selecione um médico</option>
                                    {
                                        this.state.listaMedicos.map(function(element){
                                            return(
                                                <option value={element.id} key={element.id}>{element.nome}</option>
                                            );
                                        })
                                    }
                                </select>

                                <select value={this.state.idPaciente} onChange={this.atualizaEstadoPaciente.bind(this)}>
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
                                    value={this.state.dataConsulta} 
                                    onChange={this.atualizaEstadoData.bind(this)}
                                />
                                <input 
                                    className="register__btn" 
                                    type="submit" 
                                    value="Agendar" 
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