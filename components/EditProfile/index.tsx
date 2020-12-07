import React, {useEffect, useState} from 'react';
import {API, Auth, graphqlOperation, Storage} from 'aws-amplify';
import {getUser, listOfMyTweets, listTweets} from "../../graphql/queries";
import {
    View,
    FlatList,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    TextInput,
    SafeAreaView
} from "react-native";
import Tweet from "../Tweet";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import ProfilePicture from "../ProfilePicture";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {AntDesign, EvilIcons} from "@expo/vector-icons";
import {createTweet, deleteTweet, updateUser} from "../../graphql/mutations";

const EditProfile =  () => {
    const navigaion = useNavigation();
    const [user,setUser] = useState(null)
    const [imageUrl, setImageUrl] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [usname, setUsname] = useState("");

   // const currentUser =  Auth.currentAuthenticatedUser();
    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const fetchUser = async () =>{

        const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
        if (!userInfo){return}
        try {

            const userData = await API.graphql(graphqlOperation(getUser,{id:userInfo.attributes.sub}))
            if(userData){
                setUser(userData.data.getUser)
                setImageUrl(userData.data.getUser.image);
                setUsername(userData.data.getUser.name)
                setEmail(userData.data.getUser.email)
                setUsname(userData.data.getUser.username)
          }

        }catch (e) {
            console.log(e);
        }
    }

    const pickImage = async () => {

        getPermissionAsync();
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setImageUrl(result.uri);
                setNewImageUrl(result.uri)
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
    useEffect(() => {

        fetchUser();
    }, [])
    const Separator = () => (

        <View style={styles.separator} />

    );
    const onDelete = async () => {
        setImageUrl('https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png');

    }
    const uploadImage = async () => {
        try {
            const response = await fetch(imageUrl);

            const blob = await response.blob();

            const urlParts = imageUrl.split('.');
            const extension = urlParts[urlParts.length - 1];
            const uuid =()=>'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c,r)=>('x'==c?(r=Math.random()*16|0):(r&0x3|0x8)).toString(16));
            const key = `${uuid()}.${extension}`;

            await Storage.put(key, blob);

            return key;

        } catch (e) {
            console.log(e);
        }
        return '';
    }
    const updateUserInfo = async () => {
        let image;
        if (!!newImageUrl) {
            image = await uploadImage();
        }

        try {
            const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const userData = await API.graphql(graphqlOperation(getUser,{id:currentUser.attributes.sub}))




            const upUser = {
                id: currentUser.attributes.sub,
                username:userData.data.getUser.username,
                name:username,
                email:email,
                image:imageUrl,

              //  tweets:userData.data.getUser.tweets

            }
            setUsername("d")
            navigaion.goBack();
            await API.graphql(graphqlOperation(updateUser, { input: upUser }));

        } catch (e) {
            console.log(e);
        }
    }
    return (


        <View style={styles.container}>

            <Text style={styles.username}>@{usname}</Text>


        <View style={styles.img}>

            {/*<ProfilePicture size={80} image={user?.image}/>*/}
            <ProfilePicture size={80} image={imageUrl}/>
            <TouchableOpacity onPress={pickImage}>
                <Text style={styles.pickImage}>Pick a image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <EvilIcons style={styles.deleteImg}  name={ "trash"} size={28} color={'grey'}/>
            </TouchableOpacity>

        </View>

            <View style={styles.inputsContainer}>
                <Text style={styles.titletext} >Name:</Text>
                <TextInput
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    multiline={true}
                    maxLength = {30}
                   numberOfLines={1}
                    style={styles.tweetInput}

                />

                </View>
            <View style={styles.inputsContainer}>
                <Text style={styles.titletext} >Email:</Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    maxLength = {40}
                    multiline={true}
                   numberOfLines={1}
                     style={styles.tweetInput}

                />

            </View>
            <TouchableOpacity style={styles.button} onPress={updateUserInfo}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            {/*<View style={styles.inputsContainer}>*/}
            {/*    <Text style={styles.titletext} >Email:</Text>*/}
            {/*    <TextInput*/}
            {/*        value={email}*/}
            {/*        onChangeText={(value) => setEmail(value)}*/}
            {/*        // multiline={true}*/}
            {/*        // numberOfLines={3}*/}
            {/*        // style={styles.tweetInput}*/}

            {/*    />*/}
            {/*</View>*/}

        </View>
    );

}
const styles = StyleSheet.create({
    container: {
    //    flex: 1,
    //    alignItems: 'center',
    //     alignContent:"center",
    //     textAlign:"center",
       // justifyContent: 'center',
    },
    deleteImg:{
        marginLeft: 20,
        paddingVertical: 20,
        color: Colors.light.tint,
    },

    inputsContainer: {
        marginLeft: 10,
        flexDirection: "row",
        margin:20,
    },
    buttonText: {
        marginLeft:40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        alignContent:"center",
        justifyContent:"center",
    },
    titletext:{
        fontSize: 18,
        color: Colors.light.tint,

        marginLeft:10,
        marginRight: 10
    },
    tweetInput:{
        fontSize: 15,
        color: 'black',

        marginRight: 8
    },

    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    pickImage: {
        fontSize: 18,
        color: Colors.light.tint,
        marginVertical: 20,
        marginLeft:30,
    },
    submitButton: {
        position: 'absolute',
        top:0,


        alignContent:"center",
    },
    button :{

        borderRadius: 30,
        backgroundColor: Colors.light.tint,
      //  position:"absolute",
      //
        marginLeft:130,
        //
        // alignContent:"center",
        // justifyContent:"center",

    },

    img :{
        left:50,
        flexDirection: "row",
        margin:20,
    },
    username :{

        fontSize: 18,
        marginHorizontal: 25,
        color: 'grey',
    },





});


export default EditProfile;
