import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';
import NewTweetButton from "../NewTweetButton";
import {Text, View} from "../Themed";
import Colors from "../../constants/Colors";

const SearchField = () => {

    const navigaion = useNavigation();
    const onPress = () => {
        navigaion.navigate('NewTweet')
    }
    return (

      <View style={styles.inputsContainer} >
        {/*<View style={styles.inputsContainer}>*/}
          <TouchableOpacity
              style={styles.button}
              //onPress={onPostTweet}
          >
              <Text
                  style={styles.buttonText}
              >Search</Text>
          </TouchableOpacity>
            <TextInput
                // value={tweet}
                // onChangeText={(value) => setTweet(value)}
                multiline={true}
                maxLength = {30}
                numberOfLines={1}
                style={styles.tweetInput}
                placeholder={"Search user..."}
            />




          {/*</View>*/}


          </View>
    )
}

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
export default SearchField;
