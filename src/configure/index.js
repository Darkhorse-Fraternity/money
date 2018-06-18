import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Platform,
    UIManager,
    ToastAndroid,
    StatusBar,
    BackHandler,
    NetInfo,
    Linking
} from 'react-native';
import { NavigationActions } from 'react-navigation';

// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;



@connect(
    state => ({ nav: state.nav, }),
    // (dispatch, props) => ({
    //     //...bindActionCreators({},dispatch)
    //     deeplink: () => {
    //         console.log('test:', '1111');
    //     }
    // })
)

export default class Configure extends React.Component {
    constructor(props) {
        super(props);
        //企业版检测版本
        this.config()
    }


    config = () => {
    }


    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };
    static defaultProps = {};


    _handleOpenURL = async (event)=>{
        this._handleUrl(event.url)
    }

    _getInitialURL = async ()=>{
        const url = await Linking.getInitialURL()
        this._handleUrl(url)
    }

    _handleUrl = (url)=> {



    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        Linking.addEventListener('url', this._handleOpenURL);
        this._getInitialURL()
        // NetInfo.isConnected.addEventListener(
        //     'connectionChange',
        //     (isConnected)=>{
        //        dispatch(dataStorage('isConnected',isConnected))
        //     }
        // );
        // this.props.deeplink()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        Linking.removeEventListener('url', this._handleOpenURL);


    }

    lastBackPressed: number = 0
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        const { routes, index } = nav
        const { routeName } = routes[index]
        //idnex 前两个分别是登录和tabview
        if (routeName === 'Tab') {
            const tab = routes[index]
            const tabIndex = tab.index
            const tabNav = tab.routes[tabIndex]
            if (tabNav.index > 0) {
                dispatch(NavigationActions.back())
                return true;
            }
        }
        let times = Date.now();
        if (times - this.lastBackPressed >= 2500) {
            //再次点击退出应用
            this.lastBackPressed = times;
            ToastAndroid.show("再按一次退出应用", 0);
            return true;
        }
        this.lastBackPressed = 0;
        return false;
    }


    render() {
        return this.props.children;
    }

}
