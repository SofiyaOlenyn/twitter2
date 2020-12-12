import React, {useEffect, useState} from 'react';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getUser, listTweets, listUsers} from "../../graphql/queries";
import {View,FlatList} from "react-native";
import Tweet from "../Tweet";
const Feed = () => {

    const[tweets,setTweets] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchTweets = async () => {
        setLoading(true);
        try {



            const currentUser =await Auth.currentAuthenticatedUser();
            const currentUserData = await API.graphql(graphqlOperation(getUser,{id:currentUser.attributes.sub}))

           // const followers = currentUserData.data.getUser.followers
            let results = [];


                for (let elem of currentUserData.data.getUser.followers) {
                    results.push(elem)}
        //    console.log("result  "+JSON.stringify(results))

         //   const followings = currentUserData.data.getUser.followings.length
         //    const f1= {
         //
         //
         //
         //            userID: {
         //            contains: results
         //        }
         //
         //
         //
         //    }
            const tweetsData = await API.graphql(graphqlOperation(listTweets));
            let results1 = [];


            for (let elem of tweetsData.data.listTweets.items) {
            if(results.includes(elem.userID) || elem.userID==currentUser.attributes.sub){
                results1.push(elem)
            }}

           // console.log("resultssss  "+JSON.stringify(results1.sort(compare)))



            setTweets(results1.sort(compare));
           //  console.log("result  "+JSON.stringify(tweetsData))
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
       useEffect(() =>{

               fetchTweets();
       },[])

    const compare =  (a, b) => {
        if (a.createdAt>b.createdAt) {
            return -1;
        }
        if (a.createdAt<b.createdAt) {
            return 1;
        }
        // a должно быть равным b
        return 0;
    }
    return (
        <View style={{width: '100%'}}>
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

export default Feed;
