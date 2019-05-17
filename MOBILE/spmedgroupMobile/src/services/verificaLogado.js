import auth from 'services/auth';
import jwt from 'jwt-decode';

export function verify(){
    
    auth.getItem().then(res => token = res)

    let token_decoded = jwt(token);

    if(token_decoded.tipoUsuarioReact = "Médico"){
        this.props.navigation.navigate('ListaMedicos');
    } else if(token_decoded.tipoUsuarioReact = "Paciente"){
        this.props.navigation.navigate('ListaPacientes');
    } else{
        this.props.navigation.navigate('Login');
    }
}