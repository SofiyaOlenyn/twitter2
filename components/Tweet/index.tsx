import React from "react";
import {TouchableOpacity, View} from 'react-native';
import MainContainer from "./MainContainer";
import LeftContainer from "./LeftContainer";
import {useNavigation} from "@react-navigation/native";
import {TweetType} from "../../types";
import styles from './styles'
import {Auth} from "aws-amplify";
export type TweetProps ={
    tweet:TweetType,
}


const Tweet = ({tweet}:TweetProps) =>
{

    const navigaion = useNavigation();

    const onPress = async () => {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (tweet.user.id != currentUser.attributes.sub) {
            console.log("paramKey")
            navigaion.navigate('UserProfile', {
                paramKey: tweet.user,
            })
        }



    }

    return(
    <View style ={styles.container}>
        <TouchableOpacity onPress={onPress}>
       <LeftContainer  user={tweet.user}/>
        </TouchableOpacity>
       <MainContainer tweet={tweet}/>
    </View>
)}
export default Tweet;
