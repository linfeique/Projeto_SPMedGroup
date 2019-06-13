import React, { Component } from 'react';
import './index.css';

export default class Error extends Component{
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    constructor(props){
        super(props);
    }

    render(){
        if (!this.props.show) {
            return null;
        }

        return(
            <div className="error__body">
                <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
                <div className="error__header">
                    <div className="erro__header__icon">
                        <i className="ion-information-circled"></i>
                    </div>
                    <div className="erro__header__text">
                        {this.props.erro}
                    </div>
                </div>
                <div className="error__footer">
                    <i className="ion-close" onClick={(e) => {
                        this.onClose(e);
                    }}></i>
                </div>
            </div>
        );
    }
}