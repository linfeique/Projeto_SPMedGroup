import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Image,
    ImageBackground,
    AsyncStorage,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/icon-login.png';
import axios from 'axios';

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            email: '',
            senha: ''
        }
    }

    _realizarLogin(){

        let login = {
            email: this.state.email,
            senha: this.state.senha
        }

        axios.post('http://localhost:5000/api/login', login, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const token = response.data;
            let teste = AsyncStorage.setItem('usr-spmed', token);
        })
        .catch(error => Alert.alert(error))
    }

    render(){
        return(
            <ImageBackground
                source={require('../assets/images/matinho.jpg')}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={styles.body}>
                    <View style={styles.container}>

                        <View style={styles.mainTitles}>
                            <Image source={Logo} style={styles.mainLogo}/>
                        </View>

                        <View style={styles.loginBox}>
                            <View style={styles.inputBoxEmail}>
                                <Icon name="email" size={24} color="#FFF" />
                                <TextInput
                                    style={styles.inputEmail}
                                    placeholder="Email"
                                    placeholderTextColor="#FFFFFF"
                                    underlineColorAndroid="#FFFFFF"
                                    onChangeText={email => this.setState({ email })}
                                />
                            </View>

                            <View style={styles.inputBoxPass}>
                                <Icon
                                    name="lock"
                                    size={24}
                                    color="#FFF"
                                />
                                <TextInput
                                    style={styles.inputSenha}
                                    placeholder="Password"
                                    placeholderTextColor="#FFFFFF"
                                    underlineColorAndroid="#FFFFFF"
                                    onChangeText={password => this.setState({ password })}
                                />
                            </View>

                            <View style={styles.btns}>
                                <TouchableOpacity
                                    style={styles.btnLogin}
                                    onPress={this._realizarLogin}
                                >
                                    <Icon name="send" size={20} color='#000' />
                                    <Text style={styles.btnLoginText}>Login</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.btnRegister}
                                    onPress={onPress=() => this.props.navigation.navigate('Cadastro')}
                                >
                                    <Icon name="add-box" size={20} color='#000' />
                                    <Text style={styles.btnLoginText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: '100%'
    },

    mainTitles: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    mainLogo: {
        width: 150,
        height: 150
    },

    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    loginBox: {
        width: "70%",
        marginTop: 40,
        marginBottom: 60
    },

    inputBoxEmail: {
        flexDirection: "row",
        alignItems: "center"
    },

    inputEmail: {
        width: "90%",
        color: '#FFF'
    },

    inputBoxPass: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 40
    },

    inputSenha: {
        width: "90%",
        color: '#FFF'
    },

    btns: {
        flexDirection: 'row'
    },

    btnLogin: {
        width: 91,
        height: 35,
        backgroundColor: '#ADED70',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "black",
        marginLeft: 4
    },

    btnRegister: {
        width: 100,
        height: 35,
        backgroundColor: '#ADED70',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "black",
        marginLeft: 10
    },

    btnLoginText: {
        marginLeft: 5,
        color: '#000'
    }
});

export default Login;