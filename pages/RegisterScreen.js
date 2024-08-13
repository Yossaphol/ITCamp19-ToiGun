import { StyleSheet, Text, View ,Image, TextInput ,Button, Alert} from 'react-native';import React from 'react';
import { useState } from 'react';
import { styles } from '../style/index';
import pb from '../serve/pbconnection';
import Ionicons from '@expo/vector-icons/Ionicons';

const RegisterScreen = ({navigation}) => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleRegister =  async() => {
        if (!username || !password) {
            Alert.alert("","Username or Password must not be empty");
            return
        }
        
        const users = await pb.collection('users').getFullList({
            filter : `username = '${username}'`
        });

        if (users == 0) {
            const save = await pb.collection('users').create({
                username,
                passwords : password
            })

            if (save) {
                navigation.navigate("Login")
                Alert.alert("","Register Successfully! , Please Login ><")
            }
        } else {
            Alert.alert("","Username is already!");
        }
    }

    return(
        
        <View style ={{padding : 16,flex: 1,justifyContent:'center',backgroundColor: '#2B2E4A'}}>
            <Text style ={styles.Title}>TOI GUN</Text>
            <Text style={styles.subTitle}>Register</Text>
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
                            title='Continue Register'
                            color="#45253b"
                            onPress = {handleRegister}
                        />
                    </View>
                </View>
                <View style={{margin: 15}}>
                    <Button
                        title='Click here to Login'
                        color='#903749'
                        onPress = {() => {
                            navigation.navigate("Login")
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default RegisterScreen;