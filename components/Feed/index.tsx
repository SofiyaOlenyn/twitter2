import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {listTweets} from "../../graphql/queries";
import {View,FlatList} from "react-native";
import Tweet from "../Tweet";
const Feed = () => {

const[tweets,setTweets] = useState([])
    const [loading,setLoading] = useState(false)
       useEffect(() =>{
               const fetchTweets = async() =>{
                       // to do get tweets from back and set
                   setLoading(true);
                       try{
                         const tweetsData = await API.graphql(graphqlOperation(listTweets))  ;
                         setTweets(tweetsData.data.listTweets.items)
                       }catch (e) {
                               console.log(e)
                       }finally {
                           setLoading(false);
                       }
               }
               fetchTweets();
       },[])


return (
        <FlatList style={{width: '100%'}}
                  data={tweets}
                  renderItem={({item}) => <Tweet tweet={item}/>}
                  keyExtractor={(item) => item.id}
                  refreshing={loading}
                  // onRefresh={fetchTweets}
        />
)

}

export default Feed;
