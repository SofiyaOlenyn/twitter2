
import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {UserType} from "../../types";
import Colors from "../../constants/Colors";
import {Text} from "../Themed";
import ProfilePicture from "../ProfilePicture";
import {getUser} from "../../graphql/queries";


const HeaderForMyProfile = () =>
{

    const navigaion = useNavigation();
    const [userName,setUserName] = useState('')
    const [userUsername,setUserUsername] = useState('')
    const [userImg,setUserImg] = useState('')
    const [numberOfFollowers,setNumberOfFollowers] = useState(0)
    const [numberOfFollowings,setNumberOfFollowings] = useState(0)
    const [userId,setUserId] = useState('')
    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);



        const checkIfCurrentUserFollow = async () => {

            const currentUser = await Auth.currentAuthenticatedUser();
            const currentUserData = await API.graphql(graphqlOperation(getUser, {id: currentUser.attributes.sub}))

            setUserId(currentUserData.data.getUser)
            setUserName(currentUserData.data.getUser.name)
            setUserUsername(currentUserData.data.getUser.username)
            setUserImg(currentUserData.data.getUser.image)
            setNumberOfFollowers(currentUserData.data.getUser.followers.length)
            setNumberOfFollowings(currentUserData.data.getUser.followings.length)


        }
        const openFollowersList = async () =>


            navigaion.navigate('ViewListOfFollowers', {
                user: userId,
                followers: true

            })
        const openFollowingList = async () =>
            navigaion.navigate('ViewListOfFollowers', {
                user: userId,
                followers: false

            })
        useEffect(() => {
            setRefreshing(true);

            wait(500).then(() => setRefreshing(false));
            checkIfCurrentUserFollow();

        }, [])


        return (

            <ScrollView
                //  contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={checkIfCurrentUserFollow}/>
                }
            >



                <View style={styles.container}>
                    <Text style={styles.name}>{userName}</Text>
                    <Text style={styles.username}>@{userUsername}</Text>
                    {/*<TouchableOpacity style={styles.img}*/}
                    {/*    // onPress={onPress}*/}
                    {/*>*/}
                    {/*    <ProfilePicture  size={40} image={userImg} />*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.followAndIngText} onPress={openFollowingList}>
                        <Text>Followings: {numberOfFollowings}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.followAndIngText} onPress={openFollowersList}>
                        <Text>Followers: {numberOfFollowers}</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>

        )}

        const styles = StyleSheet.create({

            container: {

                width: '100%',
                //   marginHorizontal: 20,
                flexDirection: 'row',
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }, headerContainer: {
                // height: 60,
                //   backgroundColor:'red',
                //    width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',

            },
            followAndIngText: {
                //  backgroundColor: Colors.light.tint,
                height: 20,
                marginHorizontal: 60,

                alignContent: "center",
                //  justifyContent:"center",

            },
            name: {
                //  marginLeft: 30,
                marginTop: 10,
                //  marginRight: 5,
                fontWeight: "bold"
            },
            username: {

                marginTop: 10,
                marginHorizontal: 5,
                color: 'grey',
            },
            img: {

                position: "absolute",
                //  bottom:20,
                right: 20,
                width: 60,
                // height:60,

                alignContent: "center",
                display: 'flex',

                // marginTop: 25,
                marginLeft: 20,
                // marginRight: 50,
                //color: 'grey',
            },

        });


export default HeaderForMyProfile;
