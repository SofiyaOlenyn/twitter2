import { StyleSheet } from "react-native"
const styles = StyleSheet.create(
    {
        container :{
         flex:1,
            marginHorizontal:10,

        },
        tweetHeaderContainer :{

            flexDirection: 'row',
            justifyContent: 'space-between',

        },
        tweetHeaderNames :{
            flexDirection: 'row'
        },
        name :{
            marginRight: 5,
            fontWeight: "bold"
        },
        username :{
            marginHorizontal: 5,
            color: 'grey',
        },
        createdAt :{
            marginHorizontal: 5,
            color: 'grey',
        },
        content :{
            lineHeight:18,
            marginTop:5,
        },
        image :{
            marginVertical:10,
            width:"100%",

            height:300,
            resizeMode: 'cover',
            borderRadius: 15,
            overflow:'hidden'
        }
    }
)

export default styles
