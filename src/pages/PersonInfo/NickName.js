//昵称修改
'use strict';
import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    findNodeHandle,
    Text
} from 'react-native'
import {updateNickName} from '../../request/leanCloud'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import {updateUserData} from '../../redux/actions/user'
import Toast from 'react-native-simple-toast';
import {req} from '../../redux/actions/req'
import {UPDATENICKNAME} from '../../redux/reqKeys'
import {mainColor} from '../../Theme'
import HeaderBtn from '../../components/Button/HeaderBtn'
@connect(
    (state, props) => ({
        //data:state.req.get()
        userData: state.user.data,
        load:state.req.get(UPDATENICKNAME).get('load')
    }),
    (dispatch, props) => ({
        update: (nickname) => {

            dispatch(async (dispatch, getState) => {

                const user = getState().user.data
                const params = updateNickName(user.objectId, nickname);

                await req(params,UPDATENICKNAME)


                Toast.show('修改成功');
                //修改store
                dispatch(updateUserData({nickname}))
                props.navigation.goBack()


            })

        }
    })
)


export default class NickName extends React.Component {


    constructor(props: Object) {
        super(props);
        this.state = {
            loaded: false,
            nickName: this.props.userData.nickname,
        }
    }

    state: {
        loaded: bool,
        nickName: string,
    }


    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;le
        // const {params} = state;
        return {
            title: null,

        }
    };



    _tapRight = () => {
        if (this.state !== null) {
            if (this.state.nickName.length === 0) {
                Toast.show('昵称不能为空');
                this.refs.nameInput.focus();
                return;
            } else {
                this.refs.nameInput.blur();
            }

            //接下就这里提交请求
            this.props.update(this.state.nickName)

        }
    }


    _renderHeader = () => {

        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>修改昵称</Text>
            </View>
        )
    }

    renderRowMain(title: string, placeholder: string, onChangeText: Function,
                  keyboardType: string = 'default', autoFocus: bool = false) {

        return (
            //  <View style={styles.rowMainStyle} >
            <TextInput
                ref="nameInput"
                placeholder={placeholder}
                style={styles.textInputStyle}
                onChangeText={onChangeText}
                maxLength={16}
                underlineColorAndroid='transparent'
                defaultValue={this.props.userData.nickname}
                clearButtonMode='while-editing'
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                selectionColor={mainColor}
                onSubmitEditing={this._tapRight}
                selectTextOnFocus={false}
                autoFocus={true}
            />
            //  </View>
        )
    }

    render() {
        return (
            <View style={styles.container}
                  onStartShouldSetResponderCapture={(e) => {
                      const target = e.nativeEvent.target;
                      if (target !== findNodeHandle(this.refs.nameInput)) {
                          this.refs.nameInput.blur();
                      }
                  }}>

                {this._renderHeader()}
                <View style={styles.rowStyle}>
                    {this.renderRowMain('昵称修改:', "请输入的昵称",
                        (text) => {
                            this.setState({nickName: text});
                            // this.props.refresh({rightButtonDisabled: text.length == 0,})
                        }, 'default'
                    )}
                </View>
                <View style={styles.line}/>
                <HeaderBtn
                    style={styles.headerBtn}
                    load={this.props.load }
                    title={'确定'}
                    onPress={() => {
                        this._tapRight()
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal:25,
    },
    rowStyle: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
    },


    textInputStyle: {
        //  padding:15,
        marginLeft: 2,
        fontSize: 13,
        height: 40,
        flex: 1,
        borderColor: 'gray',
        backgroundColor: '#00000000',
        color: '#333333',
    },

    headerBtn: {
        marginTop: 30,
        paddingHorizontal: 15,
        width:80
    },
    line: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    header: {
        paddingTop: 25,

    },
    headerTitle: {
        fontSize: 17,
    },
})


