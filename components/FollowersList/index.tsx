import React, {useEffect, useState} from 'react';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getUser, listOfMyTweets, listTweets} from "../../graphql/queries";
import {View, FlatList, Button, StyleSheet, TouchableOpacity, Text} from "react-native";
import Tweet, {TweetProps} from "../Tweet";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import {UserType} from "../../types";
import {updateUser} from "../../graphql/mutations";
import {UserProfileProp} from "../UserProfileFeed";

export type FollowersListProp ={
    user:UserType,
    followers: boolean
}
const FollowersList = ({user,followers}:FollowersListProp) => {

    const id = user.id
    const navigaion = useNavigation();
    const[tweets,setTweets] = useState([])
    const [loading,setLoading] = useState(false)
    const [follows,setFollows] = useState(false)
    const [numberOfFollowers,setNumberOfFollowers] = useState(0)
    const [numberOfFollowings,setNumberOfFollowings] = useState(0)
    const [followText,setFollowText] = useState("Follow")



    return (
        <View style={{width: '100%'}}>
            <Text>Bla bla</Text>
            {/*<FlatList*/}
            {/*    data={tweets}*/}
            {/*    renderItem={({item}) => <Tweet tweet={item}/>}*/}
            {/*    keyExtractor={(item) => item.id}*/}
            {/*    refreshing={loading}*/}
            {/*    onRefresh={fetchTweets}*/}
            {/*/>*/}

        </View>
    );

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        // height: 60,
        //   backgroundColor:'red',
        //    width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    followAndIngText :{
        //  backgroundColor: Colors.light.tint,
        height: 20,
        marginHorizontal:60,

        alignContent:"center",
        justifyContent:"center",

    },

    submitButton: {
        // position: 'absolute',
        top:0,


        alignContent:"center",
    },   buttonText: {
        marginLeft:170,

        //    paddingHorizontal: 20,
        //    paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        alignContent:"center",
        justifyContent:"center",
    },
    button :{
        backgroundColor: Colors.light.tint,
        height: 40,
        margin:10,
        borderRadius:20,
        alignContent:"center",
        justifyContent:"center",

    },





});


export default FollowersList;
