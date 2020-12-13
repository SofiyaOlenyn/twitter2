import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {API, Auth, graphqlOperation} from 'aws-amplify'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import {
    BottomTabParamList,
    HomeNavigatorParamList,
    MyProfileParamList,
    SearchParamList,
    TabTwoParamList
} from '../types';
import ProfilePicture from "../components/ProfilePicture";
import {useEffect, useState} from "react";
import {getUser} from "../graphql/queries";
import {Button, TouchableOpacity} from "react-native";
import * as Keychain from 'react-native-keychain'
import SearchScreen from "../screens/SearchScreen";
import {View} from "../components/Themed";
import {useNavigation} from "@react-navigation/native";
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{

          activeTintColor: Colors[colorScheme].tint ,
          showLabel: false
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} />,
        }}
      />
        <BottomTab.Screen
            name="Notifications"
            component={TabTwoNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-notifications-outline" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Messages"
            component={TabMyProfileNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-contact" color={color} />,
            }}
        />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeNavigatorParamList>();
//export const goHome = navigation => () => navigation.popToTop()()
function HomeNavigator() {

    const [user,setUser] = useState(null)

    const _onPress = async () => {

        try {
            await Auth.signOut()
        //    await Keychain.resetInternetCredentials('auth')
         //   goHome(navigation)()
        } catch (err) {
            (err.message)
        }
    }
    useEffect(()=>{
        //get current user
        const fetchUser = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
            if (!userInfo){return}
            try {

                const userData = await API.graphql(graphqlOperation(getUser,{id:userInfo.attributes.sub}))
                if(userData){
                    setUser(userData.data.getUser)
                }
            }catch (e) {
                console.log(e);
            }
        }
        fetchUser();
    } , [])
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
            headerRightContainerStyle : {
                marginRight: 15,
            },
            headerLeftContainerStyle : {
                marginLeft: 15,
            },
           headerTitle: () => (
                <Ionicons name = {"logo-twitter"} size={30} color={Colors.light.tint}/>
            ),
            headerRight: () => (
                // <MaterialCommunityIcons name = {"star-four-points-outline"} size={30} color={Colors.light.tint}/>
                <Ionicons name = {"ios-log-out"} onPress={_onPress} size={30} color={Colors.light.tint}/>
            ),
            headerLeft: () => (
             <ProfilePicture size={40} image={  user?.image } />
            )

        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );

}
const SearchStack = createStackNavigator<SearchParamList>();
function SearchNavigator() {
    const navigation = useNavigation();
    const [user,setUser] = useState(null)

    const _onPress = async () => {

        try {
            await Auth.signOut()
            //    await Keychain.resetInternetCredentials('auth')
            //   goHome(navigation)()
        } catch (err) {
            (err.message)
        }
    }
    useEffect(()=>{
        //get current user
        const fetchUser = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
            if (!userInfo){return}
            try {

                const userData = await API.graphql(graphqlOperation(getUser,{id:userInfo.attributes.sub}))
                if(userData){
                    setUser(userData.data.getUser)
                }
            }catch (e) {
                console.log(e);
            }
        }
        fetchUser();
    } , [])
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerRightContainerStyle : {
                        marginRight: 15,
                    },
                    headerLeftContainerStyle : {
                        marginLeft: 15,
                    },
                    headerTitle: () => (
                        <Ionicons name = {"logo-twitter"} size={30} color={Colors.light.tint}/>
                    ),
                    headerRight: () => (
                        // <MaterialCommunityIcons name = {"star-four-points-outline"} size={30} color={Colors.light.tint}/>
                        <Ionicons name = {"ios-log-out"} onPress={_onPress} size={30} color={Colors.light.tint}/>
                        // <Button title="Sign Out" onPress={_onPress} />
                    // sign-out ios-log-out
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="close" size={30} color={Colors.light.tint} />
                        </TouchableOpacity>
                    )

                }}

            />
        </SearchStack.Navigator>
    );

}
const TabMyProfileStack = createStackNavigator<MyProfileParamList>();
function TabMyProfileNavigator() {

    const [user,setUser] = useState(null)

    const _onPress = async () => {

        try {
            await Auth.signOut()
            //    await Keychain.resetInternetCredentials('auth')
            //   goHome(navigation)()
        } catch (err) {
            (err.message)
        }
    }
    useEffect(()=>{
        //get current user
        const fetchUser = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
            if (!userInfo){return}
            try {

                const userData = await API.graphql(graphqlOperation(getUser,{id:userInfo.attributes.sub}))
                if(userData){
                    setUser(userData.data.getUser)
                }
            }catch (e) {
                console.log(e);
            }
        }
        fetchUser();
    } , [])

    return (
        <TabMyProfileStack.Navigator>
            <TabMyProfileStack.Screen
                name="MyProfileScreen"
                component={MyProfileScreen}
                options={{
                    headerRightContainerStyle : {
                        marginRight: 15,
                    },
                    headerLeftContainerStyle : {
                        marginLeft: 15,
                    },
                    headerTitle: () => (
                        <Ionicons name = {"logo-twitter"} size={30} color={Colors.light.tint}/>
                    ),
                    headerRight: () => (
                        // <MaterialCommunityIcons name = {"star-four-points-outline"} size={30} color={Colors.light.tint}/>
                        <Ionicons name = {"ios-log-out"} onPress={_onPress} size={30} color={Colors.light.tint}/>
                    ),
                    headerLeft: () => (
                        <ProfilePicture size={40} image={  user?.image } />


                    )

                }}
            />
        </TabMyProfileStack.Navigator>
    );

}
