import React, { Component } from 'react';
import {sair} from '../../services/auth';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';

export default class BarraPerfil extends Component{
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
                    <Link onClick={sair} to="/">Sair</Link>
                    <a href="#"><i className="fas fa-user-circle"></i></a>
                </div>
            </div>
        );
    }
}