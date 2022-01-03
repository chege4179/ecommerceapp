import React, {useState} from 'react';

import {Text, View,StyleSheet} from 'react-native';
import {Input,Button} from "react-native-elements";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";

const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>

            <Input
                onChangeText={(text) => setEmail(text)}
                placeholder='Email Address'
                leftIcon={
                    <Entypo name='mail' size={25}/>
                }
                value={email}
            />
            <Input
                onChangeText={(text) => setPassword(text)}
                placeholder='Password'
                leftIcon={
                    <Fontisto name='locked' size={25}/>
                }
                value={password}
            />
            <Button
                title="Login"
                buttonStyle={styles.button}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        margin:20,
        flexDirection:'column',
        justifyContent:'center'
    },
    button:{
        width:250,
        backgroundColor:'blue'
    }

})
export default LoginScreen;
