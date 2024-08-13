import React from "react";
import { Button, Image, Text, TouchableOpacity, View, Clipboard, Alert } from "react-native";
import {styles} from "../style/index";
import Ionicons from '@expo/vector-icons/Ionicons';
import pb from "../serve/pbconnection";
const RankingList = ({ navigation, id }) => {
    const [dataitem, setdataitem] = React.useState([])
    React.useEffect(() => {
        if (dataitem.length == 0) {
            (async () => {

                const res = await pb.collection('punch').getFullList({
                    filter : `current_id = '${id}'`
                })

                setdataitem(res);
            })();
        }
    })
    return (
        <>
        
        {/* onPress={() => handleIntoCollection(1)} */}
        {
            ((dataitem.length == 0) ? <Text>Loading</Text>: dataitem.map((_data, i) => {
                return (
                    <>
                    <TouchableOpacity style={styles.ItemList} >
                        <View style={styles.ItemList_Left}>
                            <View style={styles.NameAll}>
                                <Text style={{ fontSize: 25 }}>
                                    {/* {_data.username} */}
                                    โดนต่อยไป
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text>ต่อยไป {_data.punch_count} ครั้ง</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    </>
                )
            }))
        }
        
        </>
    )
}

export default RankingList;