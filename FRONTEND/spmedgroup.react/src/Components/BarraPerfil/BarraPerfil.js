import React, { Component } from 'react';
import {sair} from '../../services/auth';
import jwt_decode from 'jwt-decode';

export default class BarraPerfil extends Component{

    logout() {
        sair();
        this.props.history.push('/');
    }

    render(){

        let token_undecoded = localStorage.getItem('usuario-spmed');
        let token_decoded = jwt_decode(token_undecoded);

        return (
            <div className="barra_perfil">
                <div className="left">
                    <a href="#">SpMedGroup</a>
                </div>
                <div className="right">
                    <a href="#">{token_decoded.email}</a>
                    <a onClick={this.logout.bind(this)}>Sair</a>
                    <a href="#"><i className="fas fa-user-circle"></i></a>
                </div>
            </div>
        );
    }
}