import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';
import NewTweetButton from "../NewTweetButton";
import {Text, View} from "../Themed";
import Colors from "../../constants/Colors";
import {API, graphqlOperation} from "aws-amplify";
import {getUser, listUsers} from "../../graphql/queries";
import Tweet from "../Tweet";
import ProfileLine from "../ProfileLine";

const SearchField = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const [usersResults, setUserResults] = useState([]);
    const navigaion = useNavigation();
    const searchUser = async () => {

        const myMap = new Map();

        myMap.set( 'username', searchFilter);
      //  setTweets(tweetsData.data.listTweets.items);

       const f= {


            username: {
                contains: searchFilter
            }

        }
        const userData = await API.graphql(graphqlOperation(listUsers, { filter: f }))
        const f1= {


            name: {
                contains: searchFilter
            }

        }
        const userData1 = await API.graphql(graphqlOperation(listUsers, { filter: f1 }))

        setUserResults([]);
        let results = [];

            for (let elem of userData.data.listUsers.items) {
                results.push(elem.id)
            }
        for (let elem of userData1.data.listUsers.items) {
            if(!results.includes(elem.id)){
            results.push(elem.id)}
        }
           // console.log("result  "+JSON.stringify(results))
       setUserResults(results);
    }


    // [
    //  {"id":"9ed16e25-fdb6-437b-9c33-da11580d959c",
    //   "username":"SofiyaOlenyn",
    //   "name":"Sophieе",
    //   "email":"olenynsofiya@gmail.com",
    //   "image":"https://lh3.googleusercontent.com/ogw/ADGmquFixVIodYxayq8WT9y9k85BcoPJEG172bkLtSi_do=s83-c-mo",
    //   "tweets":{"nextToken":null},
    //   "followers":["3b3eb13b-7acf-4596-99be-807ed63b30a1"],
    //   "followings":["3b3eb13b-7acf-4596-99be-807ed63b30a1","6be36e74-024a-4415-926a-cdbd70848824"],
    //   "createdAt":"2020-11-30T18:02:16.329Z",
    //   "updatedAt":"2020-12-10T18:36:22.212Z"
    //   }
    //   ]



    // executeSearch({
    //     variables: { filter: searchFilter }  })
    return (
<View>
      <View style={styles.inputsContainer} >
        {/*<View style={styles.inputsContainer}>*/}
          <TouchableOpacity
              style={styles.button}
              onPress={searchUser}
          >
              <Text
                  style={styles.buttonText}
              >Search</Text>
          </TouchableOpacity>
            <TextInput
                // value={tweet}
                onChangeText={(value) => setSearchFilter(value)}
                multiline={true}
                maxLength = {30}
                numberOfLines={1}
                style={styles.tweetInput}
                placeholder={"Search user..."}
            />

          </View>

    <View style={{width: '100%'}}>
        <FlatList
            data={usersResults}
            renderItem={({item}) => <ProfileLine userId={item}/>}
           // keyExtractor={(item) => item.id}
        //    refreshing={loading}
         //   onRefresh={fetchTweets}
        />

    </View>
</View>
    )
}

export default SearchField;
const styles = StyleSheet.create({
    container: {
      //  flex: 1,
      //   alignItems: 'center',
      //   justifyContent: 'center',
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
        flexDirection: 'row',
        //   marginLeft: 10,
    },
    close: {
        marginVertical: 10,
    },
    tweetInput: {
        height: 50,
        maxHeight: 50,
        fontSize: 20,
          position:"absolute",
        left:140,
    },
    button: {

     //   position:"absolute",
     //  left:-45,

        width:120,
        backgroundColor: Colors.light.tint,
        borderRadius: 30,
        height:40


    },
    buttonText: {
       paddingHorizontal: 30,

      paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
});

