import {Platform} from 'react-native'


import Setting from './Setting'
import Home from './Home'
import LoginView from './Setting/LoginView'
import PersonCenter from './PersonInfo/PersonCenter'
import PersonInfo from './PersonInfo'
import NickName from './PersonInfo/NickName'
import Feedback from './Setting/Feedback'



export const otherRoute = {
    Setting: {screen: Setting},
    PersonInfo: {screen: PersonInfo},
    NickName: {screen: NickName},
    Feedback: {screen: Feedback},
    PersonCenter: {screen: PersonCenter},
}

export const homeRoute = {
    Home: {screen: Home},
    ...otherRoute
}

export const settingRoute = {
    ...otherRoute
}


export const route = {
    Login: {screen: LoginView},
}




export const tabRoute = {
    Home: {
        screen: Home,
        path: '',
    },
    PersonCenter: {
        screen: PersonCenter,
        path: '',
    },
}

export const initialRouteName = {
    initialRouteName: 'Home',
}

export const tabiCon = {
    Home: {
        label: "Home",
        color: '#F3AC41',
        activityColor: '#F0C98B',
        icon: 'md-sunny'
    },
    PersonCenter: {
        label: "Setting",
        color: '#F3AC41',
        activityColor: '#F0C98B',
        icon: "ios-happy"
    },

}


export const navigationOptions = {
    headerStyle:{
        backgroundColor:'white',
        shadowColor: 'red',
        shadowOpacity: 0.1,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
        borderBottomColor:'#F5FCFF',
        elevation:0,
        paddingTop: (Platform.OS === "ios"  ||  Platform.Version < 20)  ? 0 : 25,
        //headerBackTitle:' '
    },
    headerTintColor:'black',
    headerTitleStyle:{
        color: 'black',
        alignItems:'center',
        fontSize:13,
    },
    headerBackTitle:null,
}