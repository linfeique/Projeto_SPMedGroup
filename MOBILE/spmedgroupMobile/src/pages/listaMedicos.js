import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from 'services/auth';
import axios from 'axios';

class ListaMedicos extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            lista: []
        }
    }

    buscarConsultas = async () => {
        await auth.getItem().then((res) => {
            let token = res.token;
            axios.get("http://192.168.3.93:5000/api/consultas", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
            })
            .then(res => this.setState({lista : res.data}))
            .catch(error => console.warn("Erro:", error))
        });
    }

    componentDidMount(){
        this.buscarConsultas();
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.nameHeader}>Bruno Salles</Text>
                    <Icon size={30} name="md-exit" style={styles.iconHeader}
                        onPress={() => {
                            auth.removeItem();
                            this.props.navigation.navigate("Login");
                        }}
                    ></Icon>
                </View>

                <View style={styles.main}>
                    <FlatList
                        contentContainerStyle={styles.mainBodyConteudo}
                        data={this.state.lista}
                        keyExtractor={item => item.id}
                        renderItem={this.renderizaItem}
                    ></FlatList>
                </View>
            </View>
        );
    }

    renderizaItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text>Médico: {item.idMedicoNavigation.nome}</Text>
                <Text>{item.idSituacaoNavigation.situacao1}</Text>
            </View>
            <View style={styles.cardMain}>
                <Text>{item.descricao}</Text>
            </View>
            <View style={styles.cardFooter}>
                <Text>Paciente: {item.idPacienteNavigation.nome}</Text>
                <Text>{item.dataConsulta}</Text>
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },

    header: {
        height: 60,
        backgroundColor: '#009B50',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    nameHeader: {
        color: "#FFF",
        fontSize: 16
    },

    iconHeader: {
        color: "#FFF"
    },

    card: {
        width: 340,
        height: 250,
        borderWidth: 0.4,
        borderColor: "black",
        marginTop: 25,
        justifyContent: 'space-between',
        borderRadius: 10,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.2,
        padding: 7,
        backgroundColor: '#00e676',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    cardMain: {
        backgroundColor: '#b9f6ca',
        height: 183,
        padding: 7
    },

    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 7,
        borderTopWidth: 0.2,
        backgroundColor: '#00e676',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },

    mainBodyConteudo: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ListaMedicos;