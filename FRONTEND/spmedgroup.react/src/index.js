import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { usuarioAutenticado } from './services/auth';

import './index.css';
import App from './pages/Login/App';
import NotFound from './pages/NotFound/NotFound';
import ListarConsulta from './pages/ListarConsultas/index';
import CadastraConsulta from './pages/CadastrarConsulta/index';

import * as serviceWorker from './serviceWorker';

const Permissao = ({component : Component}) => (
    <Route 
        render = {props => usuarioAutenticado() ? 
            (<Component { ...props } />) :
            (<Redirect to={{ pathname : '/', state : {from: props.location} }} />)
        }
    />
);

const rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Permissao path="/listarConsultas" component={ListarConsulta}/>
                <Permissao path="/cadastraConsulta" component={CadastraConsulta} />
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));

serviceWorker.unregister();
