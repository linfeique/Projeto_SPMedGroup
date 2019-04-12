import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Login/App';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import ListarConsulta from './pages/ListarConsultas/index';

const rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/listarConsultas" component={ListarConsulta}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));

serviceWorker.unregister();
