import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {verify} from 'services/verificaLogado';

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

    componentDidMount(){
        this.verify;
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },

    header: {
        height: 40,
        backgroundColor: 'red'
    },
});

export default ListaMedicos;