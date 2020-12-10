

import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Platform,
    Image,
} from 'react-native';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../components/Themed';
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import EditProfile from '../components/EditProfile';
import ProfilePicture from "../components/ProfilePicture";

export default function EditProfileScreen() {
    const navigation = useNavigation();




    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="close" size={30} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headingText}> Edit Profile </Text>
            </View>
            <View>
                <EditProfile/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    headingText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 30,
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },

    newTweetContainer: {
        flexDirection: 'row',
        padding: 15,
    },
    inputsContainer: {
        marginLeft: 10,
    },
    tweetInput: {
        height: 100,
        maxHeight: 300,
        fontSize: 20,
    },
    pickImage: {
        fontSize: 18,
        color: Colors.light.tint,
        marginVertical: 10,
    },
    image: {
        width: 150,
        height: 150,
    }
});

