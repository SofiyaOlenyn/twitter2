import * as React from 'react';
import {Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import Colors from "../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import SearchField from "../components/SearchField";
import EditProfile from "../components/EditProfile";

export default function SearchScreen() {
    const navigation = useNavigation();
    return (

        <SafeAreaView style={styles.container}>

            <View
                style={styles.headerContainer}
            >


                    <SearchField/>

            </View>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',
     //   alignItems: 'center',
     //   justifyContent: 'center',
    },
    headerContainer: {
        width: '100%',
          // alignItems: 'center',
          // justifyContent: 'center',
      //  flexDirection: 'row',
     //   justifyContent: 'space-between',
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputsContainer: {
     //   marginLeft: 10,
    },
    close: {
           marginVertical: 10,
    },
    tweetInput: {
        height: 100,
        maxHeight: 300,
        fontSize: 20,
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
});
