/* @flow */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    WebView,
    Image,
    Platform,
    Linking,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Button from '../Button'

const navbarHeight = 0
const screenHeight = Dimensions.get('window').height

import ExceptionView, { ExceptionType } from './ExceptionView';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';


const WEBVIEW_REF = 'webview';
import { NavigaNavigation } from 'react-navigation';

// const noWifi = require('../../../source/img/xy_nowifi/xy_nowifi.png');
class BaseWebView extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            status: "No Page Loaded",
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    }

    state: {
        status: string,
        backButtonEnabled: bool,
        forwardButtonEnabled: bool,
        loading: bool,
        scalesPageToFit: bool,
    };

    static propTypes = {
        url: PropTypes.string,
    };


    // static navigationOptions = props => {
    //     const { navigation } = props;
    //     const { state } = navigation;
    //     const { params } = state;
    //     return {
    //         title: params && params.title || '加载中。。',
    //         headerLeft: (
    //             <Button style={styles.buttonContainer} onPress={() => {
    //                 if (params.canGoBack) {
    //                     params.webView && params.webView.goBack()
    //                 } else {
    //                     navigation.goBack()
    //                 }
    //             }}>
    //                 <View style={styles.arrowView}/>
    //             </Button>)
    //     }
    // };


    // canGoBack: boolean = false;

    // backEventHandle() {
    //     if (this.canGoBack) {
    //         this.refs[WEBVIEW_REF].goBack();
    //     } else {
    //         this.props.pop();
    //     }
    // }
    //
    // renderLeftComponent() {
    //     return (
    //         // onPress={props.onNavigateBack}
    //         <TouchableOpacity style={styles.buttonContainer} onPress={this.backEventHandle.bind(this)}>
    //             <View style={styles.arrowView}/>
    //         </TouchableOpacity>
    //     );
    // }

    componentDidMount() {
        // this.props.refresh({renderLeftComponent:this.renderLeftComponent.bind(this)});
        console.log('WEBVIEW_REF:', this.refs[WEBVIEW_REF]);
        // this.props.navigation.setParams({ webView: this.refs[WEBVIEW_REF] })
    }

    _onNavigationStateChange(state: Object) {
        // console.log('state:',state);
        // if (state.title && state.title.length) {
        //     // this.props.refresh({title:state.title});
        //     this.props.navigation.setParams({ title: state.title })
        // }
        // // this.canGoBack = state.canGoBack;
        // // console.log('state:', state);
        // this.props.navigation.setParams({ canGoBack: state.canGoBack })
        console.log('state:', state);
    }

    _onError(error: Object) {
        console.log("webError:", error);
    }

    _onLoadStart(event) {
        // console.log("onloadStart:", event.nativeEvent);
    }
    _onLoadEnd(event){
        // console.log("_onLoadEnd:", event.nativeEvent);
    }

    _onLoad() {

    }

    _renderError() {
        return (
            // <ExceptionView exceptionType={ExceptionType.NetError} image={noWifi}/>
            <ExceptionView style={{ height: screenHeight }} exceptionType={ExceptionType.NetError}/>
        );
    }

    _renderLoading(props, e) {
        // console.log('test:',props,e);

        return (
            <ExceptionView style={{ height: screenHeight }} exceptionType={ExceptionType.Loading}/>
        );
    }

    // let jsCode = `
    //         document.querySelector('#myContent').style.backgroundColor = 'red';
    //     `;
    //
    //
    /**
     * iOS
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    _onShouldStartLoadWithRequest(event: Object) {
        //Implement any custom loading logic here, don't forget to return!
        console.log("onShouldStartLoadWithRequest:", event.url);
        if (event.url.startsWith('http://') || event.url.startsWith('https://')) {
            // this.props.navigation.setParams({canGoBack: true})
            return true;
        } else {
            Linking.canOpenURL(event.url)
                .then(supported => {
                    if (supported) {
                        return Linking.openURL(url);
                        // return false;
                    } else {
                        return false;
                    }
                }).catch(err => {
                return false;
            })
        }

        return false;
    }

    __renderBottomView = () => {



        const item = (iconName, onPress ) => {
            return (
                <TouchableOpacity
                    style={styles.bottomItem}
                    onPress={()=>{this.refs[WEBVIEW_REF] && onPress()}}>
                    <Ionicons
                        // delay={1000}
                        // useNativeDriver={true}
                        name={iconName}
                        size={35}
                        color={'black'}/>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.bottom}>
                {item('md-home',()=>{
                    for ( let i = 0 ;i<1001;i++) {
                        this.refs[WEBVIEW_REF].goBack()
                    }
                })}
                {item('md-arrow-back',()=>{this.refs[WEBVIEW_REF].goBack()})}
                {item('md-arrow-forward',()=>{this.refs[WEBVIEW_REF].goForward()})}
                {item('md-refresh',()=>{this.refs[WEBVIEW_REF].reload()})}
            </View>
        )
    }

    render() {
        // console.log(this.props);
        const params = this.props.navigation.state.params
        //  var header = Object.assign({}, httpHeader,{token:userManager.userData.user_token || ""})
        return (
            <View style={[styles.container]}>
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{ uri: params && params.uri || '' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this)}
                    //javaScriptEnabled={false}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                    onError={this._onError}
                    onLoadStart={this._onLoadStart}
                    onLoadEnd={this._onLoadEnd()}
                    onLoad={this._onLoad} //
                    //onMessage={()=>{}}
                    //onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this)}//iOS,Android 咱么处理
                    //onLoadEnd
                    //injectedJavaScript=jsCode  //Sets the JS to be injected when the webpage loads.
                    renderLoading={this._renderLoading} //Function that returns a loading indicator.
                    renderError={this._renderError} //Function that returns a view to show if there's an error.
                />
                { this.__renderBottomView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
        paddingTop:20,
    },
    webView: {
        flex: 1,
        backgroundColor: '#fbfbfb',
        marginTop: navbarHeight,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 100,
    },
    button: {
        margin: Platform.OS === 'ios' ? 14 : 16,
        //resizeMode: 'contain'
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 5,
        borderRightWidth: StyleSheet.hairlineWidth * 5,
        borderColor: 'black',
        transform: [{ rotate: '135deg' }],
        marginLeft: 15,
        width: 13,
        height: 13,
    },
    bottom: {
        backgroundColor: 'white',
        flexDirection:'row',
    },
    bottomItem:{
        width:Dimensions.get('window').width/4,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
    }
});


const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);
    //去最后一个
    // console.log("web view map state",state.route.navigationState.routes[state.route.navigationState.index]);
    return {
        //  state:state.route.navigationState.routes[state.route.navigationState.index],
        // uri:'',
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: (key) => {
            // dispatch(navigatePush(key))
            dispatch(NavigationActions.navigate(key))
        },
        pop: (state) => {
            // dispatch(navigatePop(state))
            dispatch(NavigationActions.back())
        },
        // refresh:(route)=>{
        //     // dispatch(navigateRefresh(route))
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseWebView)
