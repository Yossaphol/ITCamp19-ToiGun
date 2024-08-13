import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Profile_Collection from "../components/Profile_Collection";
import RankingList from "../components/RankingList";
import pb from "../serve/pbconnection";

const Ranking = ({ navigation, route }) => {

    return (
        <>
            <View>
                <SafeAreaView>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 20, color: '#000', }}>สมชาย Ranking</Text>
                    </View>
                    <ScrollView>
                        <RankingList navigation={navigation} id={route.params.id} />
                    </ScrollView>
                </SafeAreaView>
            </View>
        </>
    )
}

export default Ranking;