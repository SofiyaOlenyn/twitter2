import React from 'react';
import {View,FlatList} from "react-native";
import tweets from'../../data/tweets'
import Tweet from "../Tweet";
const Feed = () => (

    <FlatList style={{width:'100%'}}
        data={tweets}
        renderItem={ ({item}) => <Tweet tweet={item}  /> }
        keyExtractor={(item) => item.id}
        />

)

export default Feed;
