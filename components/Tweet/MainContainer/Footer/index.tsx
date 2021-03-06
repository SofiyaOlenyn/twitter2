import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {TweetType} from "../../../../types";
import {API,graphqlOperation,Auth} from 'aws-amplify'
export type FooterContainerProps ={
    tweet: TweetType
}
import styles from './styles';
import {createLike, deleteLike, deleteTweet} from '../../../../graphql/mutations'
import {AntDesign, Entypo, EvilIcons, Feather} from "@expo/vector-icons";
import {getTweet, listTweets} from "../../../../graphql/queries";
const Footer = ({tweet}:FooterContainerProps) => {


    const [user,setUser]=useState (null);
    const [myLike,setMyLike] = useState(null)
    const[likesCount,setLikesCount] = useState(tweet.likes.items.length)
    let [ableToDelete,setAbleToDelete] = useState(1)
    useEffect(()=>{



       const fetchUser = async () => {
           const currentUser =await Auth.currentAuthenticatedUser();
           setUser(currentUser)
           if(tweet.user.id != currentUser.attributes.sub ){
               setAbleToDelete(null);
               console.log("tweetid"+tweet.user.id );
               console.log(ableToDelete);
           }
           const searchedLike = tweet.likes.items.find(
               (like)=> like.userID == currentUser.attributes.sub )

           setMyLike(searchedLike);
       };

        fetchUser();

        },[]
    )



    const submitLike = async () => {
        const like = {
            userID: user.attributes.sub,
            tweetID: tweet.id,
        }
        try{

            const res  = await API.graphql(graphqlOperation(createLike,{input : like}));
            setMyLike(res.data.createLike);
            setLikesCount(likesCount+1)
        }catch (e) {
            console.log(e)
        }

    }

    const removeLike = async () => {
        try {
            await API.graphql(graphqlOperation(deleteLike, { input: { id: myLike.id } }))
            setLikesCount(likesCount - 1);
            setMyLike(null);
        } catch (e) {
            console.log(e);
        }
    }

    const onLike = async () => {


        if (!myLike) {
            await submitLike()
        } else {
            await removeLike();
        }

    }
    const onDelete = async () => {
        const currentUser =await Auth.currentAuthenticatedUser();
        if(tweet.user.id != currentUser.attributes.sub ){return;}
        const deleteTweet1 = {
            userID: user.attributes.sub,
            tweetID: tweet.id,
        }
        try{

             await API.graphql(graphqlOperation(deleteTweet,{input : {id: deleteTweet1.tweetID}}));

        }catch (e) {
            console.log(e)
        }

    }
    return (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Feather name={"message-circle"} size={20} color={'grey'}/>
            <Text style={styles.number}> {tweet.numberOfComments}</Text>

        </View>

        <View style={styles.iconContainer}>
            <EvilIcons name={"retweet"} size={28} color={'grey'}/>
            <Text style={styles.number}> {tweet.numberOfRetweets}</Text>

        </View>
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onLike}>
                <AntDesign name={!myLike ? "hearto" : "heart"} size={20} color={!myLike ? 'grey' :'red'}/>
            </TouchableOpacity>

            <Text style={styles.number}> {likesCount}</Text>

        </View>
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onDelete}>
            <EvilIcons name={ ableToDelete ? "trash" : "chevron-down"} size={28} color={'grey'}/>
            </TouchableOpacity>

        </View>

    </View>)
}
export default Footer;
