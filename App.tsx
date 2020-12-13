import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Amplify ,{Auth ,API, graphqlOperation} from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import config from './aws-exports'
import {getUser} from "./graphql/queries";
import {createUser} from "./graphql/mutations";
import AmplifyTheme from "./constants/AuthTheme"

Amplify.configure(config)

 function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  const getRandomImage = () => {
      return 'https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png'
  }


  const saveUserToDB = async (user) => {
      await API.graphql(graphqlOperation(createUser,{input:user}))


  }

   useEffect(() =>{
       const updateUser = async () => {
           //get current authificented user
           const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});

           if(userInfo){
               const userData = await API.graphql(graphqlOperation(getUser,{id:userInfo.attributes.sub}))
               if(!userData.data.getUser){
                   const user ={
                       id: userInfo.attributes.sub,
                       username:userInfo.username,
                       name:userInfo.username,
                       email:userInfo.attributes.email,
                       image: getRandomImage(),
                   }
                   await saveUserToDB(user);

               }else {
                   console.log("user already exists")
               }


           }

           //if it doesnt greate new
       }
       updateUser();
     },[])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
