import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { styles } from '../style/index';
import * as ImagePicker from 'expo-image-picker';
import pb from '../serve/pbconnection';
import * as FileSystem from 'expo-file-system';
import { useSelector } from 'react-redux';
import axios from 'axios';



const AddScreen = ({ navigation }) => {
    const [collection_name, SetCollection_name] = useState("")
    const [collection_img, SetCollection_img] = useState("")
    const [collection_file, setCollection_file] = useState(null)

    const App = useSelector(state => state.App)
    // const getData = async () => {
    //     // ยังไม่่เสร็จไอสัส
    // }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        // console.log(result);

        if (!result.canceled) {
            const { uri } = result;

            SetCollection_img(result);
      
            const fileInfo = await FileSystem.getInfoAsync(uri);
            const fileExtension = fileInfo.uri.split('.').pop();
            const file = {
              uri: fileInfo.uri,
              name: `photo.${fileExtension}`,
              type: `image/${fileExtension}`,
            };

            uploadFile(file)
        }
    };

    const uploadFile = (file) => {
        // Perform your upload operation using the File object
        // Example: Upload the File to a server
        setCollection_file(file)
      };

    const Additem = async () => {

        try {
            const API_KEY = '00002718d0f7d7ea69ee38b7ad9a6f15'
            const headers = {
                'content-type': 'multipart/form-data'
            }

            const formData = new FormData()
            formData.append('key', API_KEY)
            formData.append('media', collection_file)
            const resultImage = await axios.post("https://thumbsnap.com/api/upload", formData, {
                headers
            })

            console.log(resultImage.data.data.thumb)

            const data = {
                "collection_name": collection_name,
                "collection_img": resultImage.data.data.thumb,
                "id_user" : JSON.parse(App.userdata).id
            }

            console.log("data", data)

            const res = await pb.collection("collection").create(data);
            console.log(res)
            if (res) {
                console.log('Upload Successs')
                navigation.navigate('Home');
            }
            
        } catch (e) {
            console.log(e)
        }
        // console.log(`data:image/jpg;base64,${collection_img}`)
        // console.log(data)
        // getData()


    }
    return (

        <View style={{ padding: 12, flex: 1, justifyContent: 'center', backgroundColor: '#2B2E4A', justifyContent: 'space-around' }}>
            <View>
                <Text style={{ fontSize: 60, fontWeight: 800, marginBottom: 10, color: '#FFF', alignSelf: 'center', letterSpacing: 9 }}>Add</Text>
            </View>
            <View >
                <Text style={{ fontSize: 16, color: '#FFF', paddingBottom: 20 }}>Name</Text>
                <TextInput
                    style={styles.areatext}
                    onChangeText={SetCollection_name}
                    value={collection_name}
                />
                <Text style={{ fontSize: 16, color: '#FFF', paddingBottom: 20, marginTop:40 }}>Image</Text>
                {/* <ImageInput /> */}
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {collection_img && (
                    <Image source={{ uri: `data:image/jpg;base64,${collection_img.base64}` }} style={{ width: 200, height: 200, transform: [{translateY: 50},{translateX:100}],}} />
                )}
            </View>
            <View style={{}}>
                <Button
                    title='Submit'
                    color="#903749"
                    onPress={Additem}
                />
            </View>
        </View>
    )
}

export default AddScreen;