import React, { Component } from 'react';
import './App.css';
import img1 from '../../assets/images/icon-login.png';
import axios from 'axios';
import LoginError from '../../Components/Erros/index';

class App extends Component {

  constructor(){
    super();

    this.state = {
      email: '',
      senha: '',
      show: false
    }
  }

  showModal = (e) => {
    this.setState({
        ...this.state,
        show: !this.state.show
    })
  }

  atualizaEstadoEmail(event){
    this.setState({email : event.target.value})
  }

  atualizaEstadoSenha(event){
    this.setState({senha : event.target.value})
  }

  logar(event){
    event.preventDefault();

    axios.post('http://192.168.1.103:5000/api/login', {
      email: this.state.email,
      senha: this.state.senha
    })
    .then(data => {
      localStorage.setItem("usuario-spmed", data.data.token);
      this.props.history.push('/listarConsultas');
    })
    .catch((erro) => {
      if(erro.response.status == "404"){
        this.showModal()
      }
    })
  }

  render() {
    return (
      <div className="App">
        <LoginError show={this.state.show} onClose={this.showModal} erro="Usuario não existe"/>
        <div className="loginbox">
            <img src={img1} width="140px" height="150px" alt="#" className="icon-login"/>
            <form onSubmit={this.logar.bind(this)}>
              <div className="form_ext">
                  <p>Sign In</p>
                  <div className="text_box">
                      <div className="box-text">
                          <input 
                            type="text" 
                            placeholder="User Name" 
                            required 
                            value={this.state.email}
                            onChange={this.atualizaEstadoEmail.bind(this)}
                          />
                          <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="pass_box">
                          <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            value={this.state.senha}
                            onChange={this.atualizaEstadoSenha.bind(this)}
                          />
                          <i className="fas fa-check-circle"></i>
                      </div>
                      <input type="submit" value="Login" />
                  </div>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

export default App;
