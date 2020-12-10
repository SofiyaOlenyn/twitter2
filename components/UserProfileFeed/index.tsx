import React, {useEffect, useState} from 'react';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getUser, listOfMyTweets, listTweets} from "../../graphql/queries";
import {View, FlatList, Button, StyleSheet, TouchableOpacity, Text} from "react-native";
import Tweet, {TweetProps} from "../Tweet";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import {UserType} from "../../types";
import {updateUser} from "../../graphql/mutations";

export type UserProfileProp ={
    id:UserType,
}
const UserProfileFeed = ({id}:UserProfileProp) => {


    const navigaion = useNavigation();
    const[tweets,setTweets] = useState([])
    const [loading,setLoading] = useState(false)
    const [follows,setFollows] = useState(false)
    const [numberOfFollowers,setNumberOfFollowers] = useState(0)
    const [numberOfFollowings,setNumberOfFollowings] = useState(0)
    const [followText,setFollowText] = useState("Follow")


    const checkIfCurrentUserFollow = async () => {


        const currentUser =await Auth.currentAuthenticatedUser();
        const currentUserData = await API.graphql(graphqlOperation(getUser,{id:currentUser.attributes.sub}))
        const visitedUserData = await API.graphql(graphqlOperation(getUser,{id: id.id}))

        setNumberOfFollowers(visitedUserData.data.getUser.followers.length)
        setNumberOfFollowings(visitedUserData.data.getUser.followings.length)
        if (currentUserData.data.getUser.followers.includes(id.id)) {
            setFollows (true)
           // return

        }else { setFollows (false)}




    }




    const follow = async () => {

        const currentUser =await Auth.currentAuthenticatedUser();
        const currentUserData = await API.graphql(graphqlOperation(getUser,{id:currentUser.attributes.sub}))
        const visitedUserData = await API.graphql(graphqlOperation(getUser,{id: id.id}))
        let idF

        if(visitedUserData.data.getUser.followings==null){
            idF =  currentUser.attributes.sub
        }
        else {
            if (visitedUserData.data.getUser.followings.includes(currentUser.attributes.sub)) {
                idF = visitedUserData.data.getUser.followings
            } else {
                idF = visitedUserData.data.getUser.followings.concat(currentUser.attributes.sub)
            }

        }
        const upUser = {
            id: id.id,
            username: visitedUserData.data.getUser.username,
            name: visitedUserData.data.getUser.name,
            email: visitedUserData.data.getUser.email,
            followings:idF

            //  tweets:userData.data.getUser.tweets

        }
        let l1 =  await API.graphql(graphqlOperation(updateUser, { input: upUser }));
        console.log("follow ->    "+l1)
        let idF2
     //   console.log(currentUserData.data.getUser.followings)


        if(currentUserData.data.getUser.followers==null){
            idF2=id.id
        }else {
            if (currentUserData.data.getUser.followers.includes(id.id)) {
                idF2 = currentUserData.data.getUser.followers
            } else {
                idF2 = currentUserData.data.getUser.followers.concat(id.id)
            }
        }

        const upUser2 = {
            id: currentUser.attributes.sub,
            username: currentUserData.data.getUser.username,
            name: currentUserData.data.getUser.name,
            email: currentUserData.data.getUser.email,
            followers:idF2

            //  tweets:userData.data.getUser.tweets

        }
        let l2 =  await API.graphql(graphqlOperation(updateUser, { input: upUser2 }));
        console.log("following ->    "+l2)

        setNumberOfFollowings(numberOfFollowings+1)
        setFollows(true)





     //   console.log(visitedUserData.data.getUser.followers.concat(currentUser.attributes.sub))
      //  API.graphql(graphqlOperation(updateUser,{id: id}))

    }

    const unfollow = async () => {

        const currentUser =await Auth.currentAuthenticatedUser();
        const currentUserData = await API.graphql(graphqlOperation(getUser,{id:currentUser.attributes.sub}))
        const visitedUserData = await API.graphql(graphqlOperation(getUser,{id: id.id}))
        let idF

        if(visitedUserData.data.getUser.followers==null || (visitedUserData.data.getUser.followings.length==1)) {
            idF=null
        }else {

            if (visitedUserData.data.getUser.followings.includes(currentUser.attributes.sub)) {

                let i = visitedUserData.data.getUser.followings.indexOf(currentUser.attributes.sub)
                  console.log("i=  "+i)
                console.log(visitedUserData.data.getUser.followings)
                idF = visitedUserData.data.getUser.followings.splice(i,1)
                console.log("idF=  "+idF)


            } else {
                idF = visitedUserData.data.getUser.followings
            }
        }
        const upUser = {
            id: id.id,
            username: visitedUserData.data.getUser.username,
            name: visitedUserData.data.getUser.name,
            email: visitedUserData.data.getUser.email,
            followings:idF

            //  tweets:userData.data.getUser.tweets

        }
        let l1 =  await API.graphql(graphqlOperation(updateUser, { input: upUser }));
        console.log("follow ->    "+l1)
        let idF2
        //   console.log(currentUserData.data.getUser.followings)


        if(currentUserData.data.getUser.followers==null || currentUserData.data.getUser.followers.length==1){
            idF2=null
        }else {

            if (currentUserData.data.getUser.followers.includes(id.id)) {

                let i = currentUserData.data.getUser.followers.indexOf(id.id)
             //   console.log("i="+i)

                idF2 = currentUserData.data.getUser.followers.splice(i,1)


            } else {
                idF2 = currentUserData.data.getUser.followers
            }
        }

        const upUser2 = {
            id: currentUser.attributes.sub,
            username: currentUserData.data.getUser.username,
            name: currentUserData.data.getUser.name,
            email: currentUserData.data.getUser.email,
            followers:idF2

            //  tweets:userData.data.getUser.tweets

        }
        let l2 =  await API.graphql(graphqlOperation(updateUser, { input: upUser2 }));
        console.log("following ->    "+l2)
        setNumberOfFollowings(numberOfFollowings-1)
        setFollows(false);


    }

    const fetchTweets = async () => {
        setLoading(true);

        // { input: { id: currentUser.sub } }
        try {
            const tweetsData = await API.graphql(graphqlOperation(listTweets));


            let results = [];
            for (let elem of tweetsData.data.listTweets.items) {

                if (elem.userID==id.id) {
                          console.log(elem);
                    // let elem1 = elem.toString()
                    results.push(elem)
                    // }
                }
            }
            //    console.log(results)

            //  console.log(tweetsData.data.listTweets.items)

            setTweets(results);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() =>{
        checkIfCurrentUserFollow();
        fetchTweets();
    },[])



    const openFollowersList = async () =>
    navigaion.navigate('ViewListOfFollowers', {
        user : id,
        followers: true

    })
    const openFollowingList = async () =>
        navigaion.navigate('ViewListOfFollowers', {
            user : id,
            followers: false

        })

    return (
        <View style={{width: '100%'}}>

            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.followAndIngText} onPress={openFollowingList} >
                    <Text>Followings: {numberOfFollowings}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.followAndIngText} onPress={openFollowersList} >
                    <Text>Followers: {numberOfFollowers}</Text>
                </TouchableOpacity>



            </View>
            <TouchableOpacity style={styles.button} onPress={!follows ? follow : unfollow}>
                <Text style={styles.buttonText}>{ !follows ? "follow" : "unfollow"}</Text>
            </TouchableOpacity>
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


export default UserProfileFeed;
