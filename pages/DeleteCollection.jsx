import React from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image ,TextInput } from "react-native";
import Delete_Collection from "../components/Delete_Collection";
import Footer from "../components/Footer";
import { styles } from "../style";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const DeleteCollection = ({ navigation }) => {

    const [search, Setsearch] = React.useState([]);
    
    const App = useSelector(state => state.App)
    

    return(
        <>
            <View style={styles.Home}>
                {/*  style={{ backgroundColor: '', }} */}
                <SafeAreaView>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, color: '#000', }}>
                            Your All Collection <Text style={{ color: 'red' }}>{JSON.parse(App.userdata).username}</Text>
                        </Text>
                        <TextInput
                            style = {styles.areatext}
                            placeholder="Search"
                            onChangeText={Setsearch}
                            value={search}
                        />
                    </View>
                    <ScrollView>
                        <Delete_Collection navigation={navigation} />
                    </ScrollView>
                </SafeAreaView>
                
                <Footer navigation={navigation} />
            </View>
        </>
    )
}

export default DeleteCollection;