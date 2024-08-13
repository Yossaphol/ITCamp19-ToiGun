import React from "react";
import { Button, Image, Text, TouchableOpacity, View, Clipboard, Alert } from "react-native";
import {styles} from "../style/index";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import pb from "../serve/pbconnection";
const Delete_Collection = ({ navigation }) => {
    // const [clipboard, setclipboard] = React.useState('');
    const dispatch = useDispatch();
    const App = useSelector(state => state.App);
    const [Listdata, setListdata] = React.useState([]);
    const handleIntoCollection = (id) => {
        // GetId PocketBase;
        // console.log(navigation)
        navigation.navigate('Punch', { id })
    }

    const handleDelete = (id) => {
        // console.log(id);

        (async () => {
            const res = await pb.collection('collection').delete(id);

            if (res) {
                Alert.alert('System', `Delete Success ${id}`)
                
                const res = await pb.collection('collection').getFullList({
                    filter: `id_user = "${JSON.parse(App.userdata).id}"`
                });
                setListdata(res)
            }
        })();       
    }

    useEffect(() => {
        // console.log(Listdata.length == 0)
        if (Listdata.length == 0) {
            (async() => {
                // console.log(JSON.parse(App.userdata).id)
                const res = await pb.collection('collection').getFullList({
                    filter: `id_user = "${JSON.parse(App.userdata).id}"`
                });
                setListdata(res)
            })()
        }
    })
    return (
        <>

        {
            ((Listdata.length == 0) ? 
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="person-circle-outline" size={80} color={'#000'} />
                <Text style={{ fontSize: 15 }}>Empty Data Please Insert You'r collection</Text>
            </View>:
            Listdata.map((data, _i) => {
                return (
                    <>
                    <TouchableOpacity style={styles.ItemList} onPress={() => handleIntoCollection(data.id)}>
                        <View style={styles.ItemList_Left}>
                            <Image source={{ uri: data.collection_img }} resizeMode="contain" style={{ width: 100, height: 100, borderRadius: 10 }} />
                            <View style={styles.NameAll}>
                                <Text style={{ fontSize: 25 }}>
                                    {data.collection_name}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.ButtShare} onPress={() => handleDelete(data.id)}>
                            <Ionicons name="trash-outline" size= {40}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    </>
                )
            }))
        }
        </>
    )
}

export default Delete_Collection;