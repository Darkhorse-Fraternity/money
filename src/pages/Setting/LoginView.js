/* @flow */
//注册页面
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Picker,
    Dimensions,
    Platform,
    Keyboard
} from 'react-native'
import Toast from 'react-native-simple-toast';
import {BCButton} from '../../components/Base/WBButton'
import {req} from '../../redux/actions/req'
import {AUTHCODE} from '../../redux/reqKeys'
import {requestSmsCode} from '../../request/leanCloud'
import {connect} from 'react-redux'
import {register} from '../../redux/actions/user'
import * as Animatable from 'react-native-animatable';
import {checkPhoneNum} from '../../request/validation'

import {mainColor} from '../../Theme'


@connect(
    state => ({
        //data:state.req.get()
        userData: state.user,
        auth: state.req.get(AUTHCODE)
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        push: () => {
            //index 为空 则为当前index
            // dispatch(navigateReplaceIndex('TabView'));
        },
        mRegister: (state) => {
            Keyboard.dismiss()
            dispatch(register(state));
        },
        pushWebView: (params) => {
            // dispatch(navigatePush(params));
        },
        authCode: (number) => {
            const parmas = requestSmsCode(number)
            return req(parmas)
        }
    })
)


export default class LoginView extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            time: 60,
            codeName: '',
            phone: __DEV__ ? '13588833404' : "", //号码
            ymCode: __DEV__ ? '732061' : "", //验证码
            isTap: false,
        };
    }

    state: {
        phone: string,
        time: number,
        codeName: string,
        ymCode: string,
        isTap: bool, // 用于time 是否在走。
    };


    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '登录',
            // headerStyle: {
            //     backgroundColor: '#f5fcff',
            //     shadowColor: '#F5FCFF',
            //     borderBottomColor: '#F5FCFF',
            // },
        }
    };

    id: number = 0;

    async _onClickCode() {
        //发送验证码请求
        const self = this;
        this.refs['2'].focus();
        await this.props.authCode(this.state.phone)
        Toast.show("发送成功!");
        if (this.state.isTap === false) {
            this.setState({isTap: true});
            this.id = setInterval(function () {
                self.time()
            }, 1000)
        }


    }


    time() {
        if (this.state.time === 0) {
            clearInterval(this.id);
            // this.isTap = false;
            this.setState({isTap: false});
        }

        this.setState({
            time: this.state.time === 0 ? 60 : --this.state.time,
        })
    }

    _goRegist() {
        // 判断手机号的正则
        if (!checkPhoneNum(this.state.phone)) {
            Toast.show('不是正确的手机号码');
            this.refs['1'].focus();
            return;
        }
        //判断验证码的正则
        const reg = /^\d{6}$/;
        const flag = reg.test(this.state.ymCode)
        if (!flag) {
            Toast.show('不是正确验证码');
            this.refs['2'].focus();
            return;
        }

        this.props.mRegister(this.state);
        this.setState({ymCode: ''})
    }


    componentWillUnmount() {
        this.id && clearInterval(this.id);
    }

    componentWillReceiveProps(Props: Object) {
        if (Props.userData.mobilePhoneNumber != this.props.userData.mobilePhoneNumber) {
            this.setState({phone: Props.userData.mobilePhoneNumber})
        }
    }


    focusNextField(nextField: string) {

        if (nextField == '1') {
            this.refs['2'].focus();
        } else if (nextField == '2') {
            this._goRegist()
        }
    }

    _renderRowMain(title: string, placeholder: string, onChangeText: Function,
                   boardType: PropTypes.oneOf = 'default', autoFocus: bool = false, maxLength: number = 16,
                   ref: string, defaultValue: string) {

        return (
            <View style={styles.rowMainStyle}>

                <Text style={styles.textStyle}>{title}</Text>
                <TextInput
                    ref={ref}
                    defaultValue={defaultValue}
                    placeholderTextColor="rgba(180,180,180,1)"
                    selectionColor={mainColor}
                    returnKeyType='next'
                    //autoFocus={autoFocus}
                    maxLength={maxLength}
                    keyboardType={boardType}
                    style={styles.textInputStyle}
                    underlineColorAndroid='transparent'
                    placeholder={placeholder}
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                    onSubmitEditing={() => this.focusNextField(ref)}
                    onChangeText={onChangeText}/>

            </View>
        )
    }

    render() {
        var codeEnable = checkPhoneNum(this.state.phone) &&
            this.state.time == 60 && !this.state.isTap;
        const reg = /^\d{6}$/;
        const flag = reg.test(this.state.ymCode) && checkPhoneNum(this.state.phone)
        const authLoad = this.props.auth.get('load')
        return (
            <View
                onStartShouldSetResponder={() => true}
                onResponderGrant={Keyboard.dismiss}
                style={styles.container}>
                <Animatable.View
                    animation="slideInUp"
                >

                    <View style={styles.top}>
                        <View style={{flexDirection: 'row'}}>
                            {this._renderRowMain('手机号:', '请填入手机号',
                                (text) => this.setState({phone: text}), 'numeric',
                                true, 11, "1", this.state.phone
                            )}
                        </View>
                        <View style={styles.line}/>
                        <View style={{flexDirection: 'row'}}>
                            {this._renderRowMain('验证码:', '请输入验证码',
                                (text) => {
                                    this.setState({ymCode: text})
                                },
                                'numeric'
                                , false, 6, "2", this.state.ymCode
                            )}
                            <View style={styles.valLine}/>
                            <BCButton containerStyle={styles.buttonContainerStyle}
                                      disabled={!codeEnable || authLoad}
                                      isLoad={authLoad}
                                      loadColor='rgb(230,230,230)'
                                //styleDisabled={{fontWeight:'normal'}}
                                      onPress={this._onClickCode.bind(this)}
                                      style={{fontWeight: '400', fontSize: 14, color: mainColor}}
                            >
                                {this.state.time === 60 || this.state.time === 0 ? '获取验证码' :
                                    this.state.time.toString() + '秒'}
                            </BCButton>
                        </View>
                        <View style={styles.line}/>
                    </View>

                    <BCButton
                        disabled={!flag}
                        isLoad={this.props.userData.loaded}
                        onPress={this._goRegist.bind(this)}
                        containerStyle={styles.buttonContainerStyle2}>
                        登 录
                    </BCButton>
                    {/*<View style={styles.bottom}>*/}
                    {/*<Text style={styles.protocolPre}>点击开始,即表示已阅读并同意</Text>*/}
                    {/*<Button*/}
                    {/*onPress={this._gowebView}*/}
                    {/*style={styles.protocolSuf}>*/}
                    {/*《diff使用条款》*/}
                    {/*</Button>*/}
                    {/*</View>*/}
                </Animatable.View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingTop: 20,
        // height: Dimensions.get('window').height - 64,
        paddingTop:64,
    },


    rowMainStyle: {
        flex: 1,
        // width: Dimensions.get('window').width,
        height: 50,
        //marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: 15,
    },
    buttonContainerStyle: {
        //marginRight: 15,
        height: 40,
        paddingHorizontal: 15,
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    textStyle: {
        // flex: ,
        width: 65,
        fontSize: 14,
        color: '#333333',
    },
    textInputStyle: {
        // width:200,
        flex: 1,
        marginLeft: 0,
        textAlign: 'left',
        fontSize: 14,
        color: 'black',
        // backgroundColor: 'red',
        height:50
    },
    buttonSelectStyle: {
        marginLeft: Platform.OS === 'ios' ? 29 / 2 : 27,
        flex: 1,
        height: 30,
        justifyContent: 'center',
    },
    buttonTextStyle: {
        fontSize: 14,
        color: '#9ba0a2'
    },

    buttonContainerStyle2: {
        marginLeft: 29 / 2,
        marginRight: 29 / 2,
        marginTop: 30,
        height: 40,
        justifyContent: 'center',
    },

    protocolPre: {
        marginTop: 8,
        fontSize: 11,
        color: '#9e9e9e',
    },
    protocolSuf: {
        marginTop: 8,
        fontSize: 11,
        color: mainColor,
    },

    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        backgroundColor: 'white',
    },
    line: {
        height: StyleSheet.hairlineWidth,
        marginLeft: 15,
        backgroundColor: '#ebebeb'
    },
    valLine: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#ebebeb',
        marginVertical: 8,
    }
})




