import React, { Component } from 'react';
import './index.css';
import { sair } from '../../services/auth';
import img from '../../assets/images/icon-login.png';
import Menu from '../../Components/Menu/Menu';
import BarraPerfil from '../../Components/BarraPerfil/BarraPerfil';

class CadastroConsulta extends Component{

    constructor(){
        super();

        this.state = {

        }
    }

    logout(){
        sair();
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="body">
                <Menu />
                <div className="register_lado_direito">
                    <BarraPerfil />

                    <div className="box">
                        <div className="alyasar">
                            <img src={img} />
                        </div>
                        <div className="haq">
                            <select>
                                <option value="0"></option>
                                <option>Odirlei Sabella</option>
                                <option>Gustavo Seila</option>
                                <option>Tadeu Neves</option>
                            </select>

                            <select>
                                <option value="0">Selecione o paciente</option>
                                <option>Adolf Hitler</option>
                                <option>Benito Mussolini</option>
                                <option>Mao Tsé-Tung</option>
                            </select>

                            <input type="text" placeholder="Data de Consulta" />
                            <input type="submit" value="Agendar Consulta" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CadastroConsulta