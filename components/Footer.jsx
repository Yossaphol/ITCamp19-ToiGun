import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../style/index';

const Footer = ({ navigation }) => {
    return (
        <View style={[styles.FooterMain, { flexDirection: "row", gap: 10 }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Add')} style={styles.FooterItems}>
                <Ionicons name="add-outline" size={50} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Delete')} style={styles.FooterItems}>                
                <Ionicons name="trash-outline" size= {50} color={'#fff'}/>
            </TouchableOpacity>
        </View>
    )
}

export default Footer;