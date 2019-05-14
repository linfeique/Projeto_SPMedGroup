import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class ListaPacientes extends Component {
    static navigationOptions = {
        header: null
    };

    render(){
        return(
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    }
});

export default ListaPacientes;