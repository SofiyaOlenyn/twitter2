import React, {useEffect, useState} from 'react';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {listOfMyTweets, listTweets} from "../../graphql/queries";
import {View, FlatList, Button, StyleSheet, TouchableOpacity} from "react-native";
import Tweet from "../Tweet";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";


const ProfileFeed = () => {
    const navigaion = useNavigation();
    const[tweets,setTweets] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchTweets = async () => {
        setLoading(true);
        const currentUser =await Auth.currentAuthenticatedUser();

        try {
            const f1= {

                userID: {
                    contains: currentUser.attributes.sub
                }
            }
            const tweetsData = await API.graphql(graphqlOperation(listTweets,{ filter: f1 }));
          //  const tweetsData = await API.graphql(graphqlOperation(listTweets));


            let results = [];
            for (let elem of tweetsData.data.listTweets.items) {
                    results.push(elem)

            }
            //    console.log(results)

            //  console.log(tweetsData.data.listTweets.items)

            setTweets(results.sort(compare));
            results = []
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    const compare =  (a, b) => {
        if (a.createdAt>b.createdAt) {
            return -1;
        }
        if (a.createdAt<b.createdAt) {
            return 1;
        }

        return 0;
    }
    useEffect(() =>{
        fetchTweets();
    },[])



    // const tweetGet =  () => {
    //     fetchTweets();
    //     return tweets;
    // }

    return (


        <View style={{width: '100%',maxHeight:640}}>

            <FlatList
                data={tweets}
                renderItem={({item}) => <Tweet tweet={item}/>}
                keyExtractor={(item) => item.id}
                refreshing={loading}
                onRefresh={fetchTweets}
            />

        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        position: 'absolute',
        top:0,


        alignContent:"center",
    },
    button :{
        backgroundColor: Colors.light.tint,
        position:"absolute",
        bottom:20,
        right:20,
        width:60,
        height:60,
        borderRadius:50,
        alignContent:"center",
        justifyContent:"center",

    },





});


export default ProfileFeed;
