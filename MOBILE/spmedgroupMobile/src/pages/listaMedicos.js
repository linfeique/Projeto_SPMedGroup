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

    buscarConsultas(){
        let teste = auth.getItem().then(res => res);
        
        axios.get("http://192.168.56.1:5000/api/consultas", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + teste
            }
        })
        .then(res => this.setState({lista : res.data}))
        .catch(error => console.warn("Erro:", error))
    }

    componentDidMount(){
        this.buscarConsultas;
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
                <Text>Data da Consulta: {item.dataConsulta}</Text>
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
        backgroundColor: 'red',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    nameHeader: {
        color: "#FFF",
        fontSize: 16
    },

    iconHeader: {
        color: "#FFF"
    },

    card: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: "black",
    }
});

export default ListaMedicos;