import { StyleSheet, Text, View ,Image, TextInput ,Button, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { styles } from '../style/index';
import pb from '../serve/pbconnection';
import { useDispatch } from 'react-redux';
import { setuserdata } from '../reducer/AppSlice';
import Ionicons from '@expo/vector-icons/Ionicons';

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("","Username or Password must not be empty");
            return
        }

        const result = await pb.collection('users').getFullList({
            filter: `username = "${username}" && passwords = "${password}"`,
        });
        
        if (result.length != 0) {
            // dispatch(setuserdata(result[0]));
            dispatch(setuserdata(JSON.stringify(result[0])));
            navigation.navigate("Home")
        } else {
            Alert.alert("system", "Agian Please...")
        }
    }

    
    return(
        <View style ={{padding : 16,flex: 1,justifyContent:'center',backgroundColor: '#2B2E4A'}}>
            <Text style ={styles.Title}>TOI GUN</Text>
            <Text style={styles.subTitle}>Login</Text>
            <View style= {{justifyContent:'center',alignItem:'center'}}>
                <View style={styles.cardlogin}>
                    <Text style={styles.textuser}><Ionicons name="person-circle-outline" size={20} color={'#fff'} />&nbsp;Username</Text>
                    <TextInput
                        style= {styles.areatext}
                        onChangeText= {setUsername}
                        value = {username}
                        placeholder='Username . . .'
                    />
                    <Text style={styles.textuser}><Ionicons name="key-outline" size={20} color={'#fff'} />&nbsp;Password</Text>
                    <TextInput
                        style= {styles.areatext}
                        onChangeText= {setPassword}
                        value = {password}
                        secureTextEntry = {true}
                        placeholder='Passwords . . .'
                    />

                    <View style={{paddingTop: 30}}>
                        <Button
                            title='Continue Login'
                            color="#45253b"
                            onPress = {handleLogin}
                        />
                    </View>
                </View>
                <View style={{margin: 15}}>
                    <Button
                        title='Click here to register'
                        color='#903749'
                        onPress = {() => {
                            navigation.navigate("Register")
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default LoginScreen;