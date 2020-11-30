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

Amplify.configure(config)

 function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
      return 'https://lh3.googleusercontent.com/ogw/ADGmqu_FixVIodYxayq8WT9y9k85BcoPJEG172bkLtSi_do=s83-c-mo'
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
               //check if user already exis t in data base

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
