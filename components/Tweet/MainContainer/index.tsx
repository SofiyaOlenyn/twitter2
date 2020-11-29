import React from "react";
import {View, Text,Image} from 'react-native';
import {TweetType} from "../../../types";
export type MainContainerProps ={
    tweet:TweetType
}
import Footer from './Footer'
import styles from "./styles";
import {Entypo} from "@expo/vector-icons";
import moment from 'moment';
const MainContainer = ({tweet}:MainContainerProps) =>(
    <View style={styles.container}>
        <View style={styles.tweetHeaderContainer}>
            <View style={styles.tweetHeaderNames}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>@{tweet.user.username}</Text>
            <Text style={styles.createdAt}>{moment(tweet.createdAt).fromNow()}</Text>
            </View>

            <Entypo name={"chevron-down"} size={16} color={'gray'}/>

        </View>
        <View>
            <Text style={styles.content}>{tweet.content}</Text>
            {!!tweet.image && <Image style={styles.image} source = {{uri:tweet.image}}/>}
        </View>
    <Footer tweet={tweet}/>
    </View>
)
export default MainContainer;
