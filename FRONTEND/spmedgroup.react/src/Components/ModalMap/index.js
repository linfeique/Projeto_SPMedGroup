import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';

const mapStyles = {
    width: '85%',
    height: '85%',
    margin: '0 auto',
    marginTop: 20
};

const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 300,
}

const modalStyle = {
    backgroundColor: '#FFF',
    borderRadius: 5,
    maxWidth: 800,
    minHeight: 500,
    margin: '0 auto',
    position: 'relative',

}

const btn__close = {
    color: '#000',
    position: 'absolute',
    top: 10,
    right: 12,
    cursor: 'pointer'
}

class ModalMap extends Component{

    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false, //Esconde ou mostra as informações do local.
            activeMarker: {}, //Mostra o ícone ativado.
            selectedPlace: {}, //Mostra as informações em cima do local.
            listaConsultasLocalidade: [],
            listaConsultas: [],
            lat: '',
            lng: ''
        };
    }

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onExit = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    buscarConsultas(a){

        if(a != 0){
            let id = {
                idConsulta: a
            }
    
            fetch('http://192.168.3.93:5000/api/consultasmongo/buscarporid', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
            })
            .then(res => { return res.json()})
            .then(data => console.log(data))
            .catch(erro => console.log("Erro: ", erro))
        }
    }

    componentWillReceiveProps(props){
        this.buscarConsultas(props.idConsulta);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div style={backdropStyle}>
                <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
                <div style={modalStyle}>
                    <div style={btn__close} onClick={(e) => this.onClose(e)}>
                        <i className="ion-close-round"></i>
                    </div>
                    <Map
                        google={this.props.google}
                        zoom={14}
                        style={mapStyles}
                        initialCenter={{ lat: -1.2884, lng: 36.8233 }}
                    >
                        {
                            this.state.listaConsultas.map((e) => {
                                return (
                                    <div>
                                        <Marker
                                            onClick={this.onMarkerClick}
                                            name={'Kenyatta International Convention Centre'}
                                            position={{
                                                lat: 53.27379,
                                                lng: -121.75756
                                            }}
                                        />
                                        <InfoWindow
                                            marker={this.state.activeMarker}
                                            visible={this.state.showingInfoWindow}
                                            onExit={this.onExit}
                                        >
                                            <div>
                                                <h4>{this.state.selectedPlace.name}</h4>
                                            </div>
                                        </InfoWindow>
                                    </div>
                                );
                            })
                        }
                    </Map>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    //apiKey: 'YOUR_GOOGLE_API_KEY_GOES_HERE'
})(ModalMap);