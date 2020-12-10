
import React, {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {UserType} from "../../types";
import Colors from "../../constants/Colors";
import {Text} from "../Themed";
import ProfilePicture from "../ProfilePicture";
import {getUser} from "../../graphql/queries";
export type ProfileLineProps ={
    userId : String,
}


const ProfileLine = ({userId}:ProfileLineProps) =>
{

    const navigaion = useNavigation();
    const [userName,setUserName] = useState('')
    const [userUsername,setUserUsername] = useState('')
    const [userImg,setUserImg] = useState('')




    const checkIfCurrentUserFollow = async () => {


      //  const currentUser =await Auth.currentAuthenticatedUser();
        const currentUserData = await API.graphql(graphqlOperation(getUser,{id:userId}))


        setUserName(currentUserData.data.getUser.name)
        setUserUsername(currentUserData.data.getUser.username)
        setUserImg(currentUserData.data.getUser.image)




    }
    const onPress = async () => {
        const currentUser = await Auth.currentAuthenticatedUser();
        const currentUserData = await API.graphql(graphqlOperation(getUser,{id:userId}))
        console.log("sdcxs"+userId)

        if (userId != currentUser.attributes.sub) {
            //console.log("paramKey")
            navigaion.navigate('UserProfile', {
                paramKey:currentUserData.data.getUser,
            })
        }



    }
    useEffect(() =>{
        checkIfCurrentUserFollow();

    },[])


    return(
        <View style ={styles.container}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.username}>@{userUsername}</Text>
            <TouchableOpacity style={styles.img}
                              // onPress={onPress}
            >
            <ProfilePicture  size={40} image={userImg} />
            </TouchableOpacity>
         </View>
    )}
const styles = StyleSheet.create({

    container: {

        width:'100%',
        marginHorizontal: 20,
        flexDirection: 'row',
       // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    name :{

        marginTop: 25,
        marginRight: 5,
        fontWeight: "bold"
    },
    username :{

        marginTop: 25,
        marginHorizontal: 5,
        color: 'grey',
    },
    img :{

        position:"absolute",
      //  bottom:20,
        right:20,
        width:60,
       // height:60,

        alignContent:"center",
        display: 'flex',

       // marginTop: 25,
        marginLeft: 20,
       // marginRight: 50,
        //color: 'grey',
    },
    // headerContainer: {
    //     // height: 60,
    //     //   backgroundColor:'red',
    //     //    width: '100%',
    //
    //     justifyContent: 'space-between',
    //
    // },
    // followAndIngText :{
    //     //  backgroundColor: Colors.light.tint,
    //     height: 20,
    //     marginHorizontal:60,
    //
    //     alignContent:"center",
    //     justifyContent:"center",
    //
    // },
    //
    // submitButton: {
    //     // position: 'absolute',
    //     top:0,
    //
    //
    //     alignContent:"center",
    // },   buttonText: {
    //     marginLeft:170,
    //
    //     //    paddingHorizontal: 20,
    //     //    paddingVertical: 10,
    //     color: 'white',
    //     fontWeight: 'bold',
    //     fontSize: 16,
    //     alignContent:"center",
    //     justifyContent:"center",
    // },
    // button :{
    //     backgroundColor: Colors.light.tint,
    //     height: 40,
    //     margin:10,
    //     borderRadius:20,
    //     alignContent:"center",
    //     justifyContent:"center",







});


export default ProfileLine;
