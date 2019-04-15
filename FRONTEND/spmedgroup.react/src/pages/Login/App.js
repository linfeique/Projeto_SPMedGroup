import React, { Component } from 'react';
import './App.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import img1 from '../../assets/images/icon-login.png';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();

    this.state = {
      email: '',
      senha: ''
    }
  }

  atualizaEstadoEmail(event){
    this.setState({email : event.target.value})
  }

  atualizaEstadoSenha(event){
    this.setState({senha : event.target.value})
  }

  logar(event){
    event.preventDefault();

    axios.post('http://localhost:5000/api/login', {
      email: this.state.email,
      senha: this.state.senha
    })
    .then(data => {
      localStorage.setItem("usuario-spmed", data.data.token);
      this.props.history.push('/listarConsultas');
    })
    .catch(erro => console.log("Erro: ", erro))
  }

  render() {
    return (
      <div className="App">
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
