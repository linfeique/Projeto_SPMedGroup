import React, { Component } from "react";
import jwtDecode from 'jwt-decode';
import auth from 'services/auth';

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

export default class PaginaEspera extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            tipoUsuario: ""
        };
    }

    componentDidMount() {
        this.carregaToken();
    };

    carregaToken = async () => {
        await auth.getItem().then((token) => {
            this.setState({ token: token }, () => {
                this.carregarPage();
                this.buscarDados();
            });
        });
    };

    buscarDados = async () => {
        try {
            await auth.getItem().then((value) => {
                if (value !== null) {
                    this.setState({ tipoUsuario: jwtDecode(value).tipoUsuario });
                    this.setState({ token: value });
                }
            });
        } catch (error) { }
    };

    carregarPage = async () => {
        // let decode = jwtDecode(token);
        const userToken = this.state.token;
        let decode = jwtDecode(userToken);
        // console.warn(userToken)
        if (decode.tipoUsuario === "Medico") {
            this.props.navigation.navigate("ListaMedicos");
        } else {
            this.props.navigation.navigate("ListaPacientes");
        }

    }

    render() {
        return (
            <View >
                <View>
                    <Text >{"Carregando...Espere um pouco!!!!!!!!".toUpperCase()}</Text>
                    <TouchableOpacity onPress={this.carregarPage}>
                        <Text >{"Prosseguir".toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
