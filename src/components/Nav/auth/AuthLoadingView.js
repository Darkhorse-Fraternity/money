import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import {loadUserData} from '../../../configure/storage'
import {loginSucceed,getConfig} from '../../../redux/actions/user'
import { connect } from 'react-redux'

@connect(
    state => ({}),
    (dispatch, props) => ({
        bootstrapAsync:async () => {
            // props.navigation.navigate('WebView',{uri:'https://www.baidu.com/'});

            try{
                //先去取配置
                let config = await getConfig('1')

                console.log('test:', config);
                if(config && config['results'] && config['results'][0]){
                    config = config['results'][0];
                    if(!config.review){
                        props.navigation.navigate('WebView',{uri:config.url});
                    }else {
                        const user = await loadUserData();
                        dispatch(loginSucceed(user))
                        props.navigation.navigate(user ? 'Tab' : 'Login');
                    }
                }else {
                    const user = await loadUserData();
                    dispatch(loginSucceed(user))
                    props.navigation.navigate(user ? 'Tab' : 'Login');
                }

            }catch(e) {
                console.log('test:', e.message);
                props.navigation.navigate('Login');

            }

        }
    })
)

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place


    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                {/*<StatusBar barStyle="default" />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }
})