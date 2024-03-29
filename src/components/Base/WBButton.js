/*@flow*/
'use strict';
import Button from '../Button/InButton';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
    StyleSheet,
    View,
    ActivityIndicator,
    ViewPropTypes
} from 'react-native';
// import Spinner from 'react-native-gifted-spinner';


const styles = StyleSheet.create({
    WBbuttonStyle: {
        color: 'white',
    },
    WBDisabledStyle: {
        color: '#999999'//lightContainingColor,
    },
    WBContainerStyle: {
        backgroundColor: '#f1bd49',
        borderRadius: 3
    },
    WBContainerDisabledStyle: {
        backgroundColor: '#dddddd',
        borderRadius: 3,
    }
});

export default class WBButton extends Component {

    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        ...Button.PropTypes,
        containerStyleDisabled: ViewPropTypes.style,
        isLoad: PropTypes.bool,
        loadColor: PropTypes.string
        // children:PropTypes.Object
    };
    static defaultProps = {
        loadColor:"white"
    };
    //  _renderSpinner(){
    //    return(
    //
    //    )
    //  }

    render() {

        var disabled = this.props.disabled;
        var containerStyle = this.props.containerStyle;
        if (this.props.containerStyleDisabled !== null) {
            containerStyle = disabled ? this.props.containerStyleDisabled
                : this.props.containerStyle;
        }
        // console.log('child',this.props.children);
        // console.log("disabled",disabled,"isLoad",this.props.isLoad);
        return (
            <Button
                onPress={this.props.onPress}
                style={this.props.style}
                styleDisabled={this.props.styleDisabled}
                containerStyle={containerStyle}
                disabled={disabled || this.props.isLoad}>
                {this.props.isLoad ?
                    <ActivityIndicator color={this.props.loadColor}/>
                    : this.props.children}
            </Button>
        )
    }
}

//设定默认背景图片
export class BCButton extends Component {

    static propTypes = {
        ...WBButton.propTypes,
    };

    render() {
        return (
            <WBButton
                {...this.props}
                onPress={this.props.onPress}
                style={[styles.WBbuttonStyle,this.props.style]}
                styleDisabled={[styles.WBDisabledStyle,this.props.styleDisabled]}
                containerStyle={[styles.WBContainerStyle,this.props.containerStyle]}
                containerStyleDisabled={[styles.WBContainerDisabledStyle,this.props.containerStyleDisabled || this.props.containerStyle]}
                disabled={this.props.disabled}>
                {this.props.children}
            </WBButton>
        )
    }
}
