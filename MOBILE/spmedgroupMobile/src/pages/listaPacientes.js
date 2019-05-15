import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class ListaPacientes extends Component {
    static navigationOptions = {
        header: null
    };

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
        height: 50,
        backgroundColor: 'red'
    }
});

export default ListaPacientes;