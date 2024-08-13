import React, { useState } from "react";
import { View, Text, Image, Button, Clipboard, Alert, Animated, TouchableOpacity, Pressable, SafeAreaView, ScrollView } from "react-native";
import { styles } from '../style/index';
import pb from "../serve/pbconnection";
import { useSelector } from "react-redux";


const Punch = ({ navigation, route }) => {

    const [imageBeClicked, setImageBeClicked] = useState(false)
    const [scale, setScale] = useState(new Animated.Value(1));
    const [punchdata, setpunchdata] = useState([]);
    const [dataitem, setdataitem] = useState([]);

    const App = useSelector(state => state.App)
    const handleshare = (id) => {
        // console.log(id);
        Clipboard.setString(`${id}`)
        Alert.alert('System', `Copied Id for share ${id}`)
    }
    
    React.useEffect(() => {
        (async () => {

            const user = await pb.collection('punch').getFullList({
                filter : `current_id = '${route.params.id}'`
            })
            
            if (user.length == 0) {
                const insert = await pb.collection('punch').create({
                    current_id : route.params.id,
                    id_users : JSON.parse(App.userdata).id,
                    punch_count : 0,
                    username : JSON.parse(App.userdata).username
                })

                if (insert.length >= 1) {
                    const resss = await pb.collection('collection').getFullList({
                        filter: `id = "${route.params.id}"`
                    });
                    setdataitem(resss)
                    const res = await pb.collection('punch').getFullList({
                        filter : `current_id = '${route.params.id}'`
                    })
                    
                    setpunchdata(res);
                }
            } else {
                const resss = await pb.collection('collection').getFullList({
                    filter: `id = "${route.params.id}"`
                });
                setdataitem(resss)
                const res = await pb.collection('punch').getFullList({
                    filter : `current_id = '${route.params.id}'`
                })
                
                setpunchdata(res);
            }
        })();
    }, [])

    const handleImageClick = (id, count) => {
        Animated.spring(scale, {
            toValue: .8,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }, 100);

        (async () => {
            const res = pb.collection('punch').update(punchdata[0].id, {
                punch_count : (Number(count) + 1)
            }).then(async (res) => {
                if (res) {
                
                    const res = await pb.collection('punch').getFullList({
                        filter : `current_id = '${route.params.id}'`
                    })
                    
                    setpunchdata(res);
                }
            });
        })();
    };
    return (
        <>
            {
                ((punchdata.length == 0) ? <Text>Loading</Text>:
                punchdata.map((datas, idx) => {
                    return (
                        <>
                            <ScrollView style={{backgroundColor: '#2B2E4A'}}>
                                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', gap: 10, }}>
                                <Text style={styles.Title}>!TOI GUN!</Text>
                                <View style={{backgroundColor: "#903749", width: 350 , alignItems: "center" , justifyContent: "center" ,borderRadius: 25 ,padding: 20 }}> 
                                    <Text style={{ fontSize: 20 ,color:'#fff',fontWeight:600, padding: 16}}>Score Punch : {datas.punch_count}</Text>
                                    <TouchableOpacity onPress={() => handleImageClick(datas.id, datas.punch_count)}>
                                    <Animated.Image
                                        style={[{ transform: [{ scale }] }, { width: 250, height:250, borderRadius: 10 }]}
                                        resizeMode="contain"
                                        source={{ uri: dataitem[0].collection_img }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 25,color: '#fff' , padding: 12, backgroundColor: "#45253b" , borderRadius: 8 , marginTop: 20 }}>Stinging now '{dataitem[0].collection_name}'</Text>
                                </View>

                                {/* <Button color={'red'} title="View Ranking" onPress={() => navigation.navigate('Ranking', { id: dataitem[0].id })} /> */}
                                <Button title="Share Collection!" onPress={() => handleshare(dataitem[0].id)} />
                            </View>
                            </ScrollView>
                        </>
                    )
                }))
            }
        </>
    )
}

export default Punch;