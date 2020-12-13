import * as React from 'react';
import {Button, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import { Text, View } from '../components/Themed';

import ProfileFeed from "../components/ProfileFeed";
import NewTweetButton from "../components/NewTweetButton";
import {useNavigation} from "@react-navigation/native";
import Colors from "../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import EditProfile from "../components/EditProfile";
import ProfilePicture from "../components/ProfilePicture";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {BottomTabParamList} from "../types";
import Feed from "../components/Feed";
import UserProfileFeed from "../components/UserProfileFeed";
import Tweet from "../components/Tweet";
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
    const UserProfileScreen = ({route}) => {

        const wait = (timeout) => {
            return new Promise(resolve => {
                setTimeout(resolve, timeout);
            });
        }
       // console.log(route.params.paramKey)
    const navigation = useNavigation();

        const [refreshing, setRefreshing] = React.useState(false);

        const onRefresh = React.useCallback(() => {
            setRefreshing(true);

            wait(2000).then(() => setRefreshing(false));
        }, []);

    const Separator = () => (
        <View style={styles.separator} />
    );
    const onPress = () => {

        navigation.navigate('EditProfile')
    }
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="close" size={30} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.name}>{route.params.paramKey.name}</Text>
                <Text style={styles.username}>@{route.params.paramKey.username}</Text>
                <ProfilePicture size={60} image={route.params.paramKey.image}/>

            </View>

            <UserProfileFeed
                id={route.params.paramKey}

            />
            <BottomTabNavigator/>
        </SafeAreaView>
    );
}
export default UserProfileScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
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



});
