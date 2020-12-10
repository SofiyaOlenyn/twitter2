import * as React from 'react';
import {Button, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';

import ProfileFeed from "../components/ProfileFeed";
import NewTweetButton from "../components/NewTweetButton";
import {useNavigation} from "@react-navigation/native";
import Colors from "../constants/Colors";
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import HeaderForMyProfile from "../components/HeaderForMyProfile"
import ProfilePicture from "../components/ProfilePicture";
export default function MyProfileScreen() {
    const navigaion = useNavigation();


    const Separator = () => (
        <View style={styles.separator} />
    );
    const onPress = () => {

        navigaion.navigate('EditProfile')
    }


    return (
        <View style={styles.container}>
            <Separator />
            <HeaderForMyProfile/>
            <Button title="Edit profile" onPress={onPress} />
            <ProfileFeed />
            <NewTweetButton/>
            <BottomTabNavigator/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        position: 'absolute',
        top:0,


        alignContent:"center",
    },  separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button :{
        backgroundColor: Colors.light.tint,
        position:"absolute",
        bottom:20,
        right:20,
        width:60,
        height:60,
        borderRadius:50,
        alignContent:"center",
        justifyContent:"center",

    },





});
