import * as React from 'react';
import {StyleSheet, TouchableOpacity,
    SafeAreaView,
TextInput} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {EvilIcons} from "@expo/vector-icons";
import Tweet from '../components/Tweet'
import tweets from '../data/tweets'
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import {useState} from "react";
import {API, graphqlOperation, Auth} from 'aws-amplify'
import {useNavigation} from '@react-navigation/native'
import {createTweet} from "../graphql/mutations";

export default function NewTweetScreen() {

    const [tweet,setTweet]=useState("")
    const [imageUrl,setImageUrl]=useState("")

    const navigation = useNavigation();
    const onPostTweet = async () => {
       try{
           const currentUser = await Auth.currentAuthenticatedUser({bypassCache:true});
           const newTweet={
               content:tweet ,
               image:imageUrl,
               userID: currentUser.attributes.sub,
           }
           await API.graphql(graphqlOperation(createTweet,{input:newTweet}))
           navigation.goBack()
       }catch (e) {
           console.log(e)
       }
    }
    return (
        <SafeAreaView style={styles.container}>
         <View style={styles.headerContainer}>
             <TouchableOpacity onPress={()=> navigation.goBack()} >
             <EvilIcons name={"close"} size={30} color={Colors.light.tint}/>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button} onPress={onPostTweet} >
                 <Text  style={styles.buttonText}>
                     Tweet
                 </Text>
             </TouchableOpacity>
         </View>
<View style={styles.newTweetContainer}>
      <ProfilePicture image={'https://lh3.googleusercontent.com/ogw/ADGmqu_FixVIodYxayq8WT9y9k85BcoPJEG172bkLtSi_do=s83-c-mo'} />
    <View style={styles.inputContainer}>
      <TextInput
          value={tweet}
          onChangeText={(value) => setTweet(value)}
          multiline={true}
          numberOfLines={3}

            style={styles.tweetInput}
           placeholder={"what's happening?"}
/>
    <TextInput
        value={imageUrl}
        onChangeText={(value) => setImageUrl(value)}

        style={styles.imageInput}
               placeholder={"Image url (optional)"}
    />
    </View>
</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',

        // justifyContent: 'center',
    },
        headerContainer:{
        width:"100%",
        flexDirection:"row",
            justifyContent:'space-between',
            padding:15,

        },
    button : {
     backgroundColor: Colors.light.tint,
        borderRadius:30,
    },
    buttonText : {
       paddingHorizontal:20,
        paddingVertical:10,
        color: 'white',
        fontWeight:'bold',
        fontSize:16,
    },
    newTweetContainer:{
        flexDirection:'row',
        padding:15,
    },
        inputContainer:
            {
                  marginLeft:10,

        },
        tweetInput:{
            height:100,
            maxHeight:300,
            fontSize:20,
        },
        imageInput:{},
}

);
