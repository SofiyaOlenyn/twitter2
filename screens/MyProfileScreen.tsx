import * as React from 'react';
import {Button, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';

import ProfileFeed from "../components/ProfileFeed";
import NewTweetButton from "../components/NewTweetButton";
import {useNavigation} from "@react-navigation/native";
import Colors from "../constants/Colors";
export default function MyProfileScreen() {
    const navigaion = useNavigation();
    const Separator = () => (
        <View style={styles.separator} />
    );
    const onPress = () => {

        navigaion.navigate('NewTweet')
    }
    return (
        <View style={styles.container}>
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Button title="Edit profile" onPress={onPress} />

            {/*<View style={styles.submitButton}>*/}
            {/*   */}
            {/*</View>*/}
            <ProfileFeed />
            <NewTweetButton/>
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
