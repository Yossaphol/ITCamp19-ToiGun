import React from "react";
import { Button, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image,TextInput, Alert } from "react-native";
import Profile_Collection from "../../components/Profile_Collection";
import Footer from "../../components/Footer";
import { styles } from "../../style";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dialog from "react-native-dialog";

const Home = ({ navigation }) => {
    const [visable, setvisable] = React.useState(false);
    const [join_id, setjoin_id] = React.useState('')
    
    const App = useSelector(state => state.App)

    const handleJoin = () => {
        if (join_id.length != 0) {
            navigation.navigate('Punch', { id : join_id })
        } else {
            Alert.alert("System", "Null Please Again");
        }
    }

    React.useEffect(() => {
        Alert.alert("System", 'คณะผู้จัดทำไม่มีส่วนเกี่ยวข้องหากรูปของท่านเข้าข่าย PDPA')
    }, [])
    
    
    // const HeaderDia = () => {
    //     return (
    //         <>
    //             <Dialog.Container visible={visable}>
    //                 <Dialog.Title>Account delete</Dialog.Title>
    //                 <Dialog.Description>
    //                     Id from firend
    //                 </Dialog.Description>
    //                 <TextInput
    //                     placeholder="Join_id"
    //                     ref={join_id}
    //                 />
    //                 {/* <Dialog.Input placeholder="Join_id" ref={join_id} /> */}
    //                 <Dialog.Button label="Cancel" onPress={() => setvisable(false)} />
    //                 <Dialog.Button label="Join" onPress={() => console.log(join_id.current)} />
    //             </Dialog.Container>
    //         </>
    //     ) 
    // }
    return (
        <View style={{...styles.Home,backgroundColor: '#2B2E4A'}}>
            {/* <HeaderDia /> */}
            {/*  style={{ backgroundColor: '', }} */}
            <SafeAreaView>
                <ScrollView style={{ height: '90%' }}>
                    <View style={{ padding: 10 }}>
                        <TextInput 
                            placeholder="Join_id"
                            onChangeText={setjoin_id}
                            value={join_id}
                            style={[styles.areatext, {margin: 10}]}
                        />
                        <Button title="Join With Friend!" onPress={handleJoin} />
                        <Text style={{ fontSize: 20, color: '#FFF', }}>
                            Your All Collection <Text style={{ color: 'red' }}>{JSON.parse(App.userdata).username}</Text>
                        </Text>
                    </View>
                    {/* <View>
                        {
                            Listdata.map((data, _i) => {
                                return (
                                    <>
                                    <TouchableOpacity style={styles.ItemList} onPress={() => handleIntoCollection(data.id)}>
                                        <View style={styles.ItemList_Left}>
                                            <Image source={{ uri: `http://34.142.252.181:8091/api/files/91iyd9e50mm3rwd/${data.id}/${data.collection_img}?token=` }} resizeMode="contain" style={{ width: 100, height: 100, borderRadius: 10 }} />
                                            <View style={styles.NameAll}>
                                                <Text style={{ fontSize: 25 }}>
                                                    {data.collection_name}
                                                </Text>
                                                <Text style={{ fontSize: 15 }}>
                                                    จำนวนโดนต่อย Nan ครั้ง
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.ButtShare} onPress={() => handleshare(data.id)}>
                                            <Ionicons name="return-up-forward-outline" size={40} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    </>
                                )
                            })
                        }
                    </View>
                    <Text>--------------------------------------------</Text> */}
                    <ScrollView>
                        <Profile_Collection navigation={navigation} />
                    </ScrollView>
                </ScrollView>
            </SafeAreaView>
            
            <Footer navigation={navigation} />
        </View>
    )
}

export default Home;