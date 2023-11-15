import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React ,{useState, useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CLIENT_ID = "fb1a236871bf4ce0822800333610feef";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:19006/";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-email",
  "user-library-read",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public"
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);

      AsyncStorage.clear();

      AsyncStorage.setItem("accessToken", access_token);
      AsyncStorage.setItem("tokenType", token_type);
      AsyncStorage.setItem("expiresIn", expires_in);

      setAccessToken(access_token);
    }
  }, []);
  useEffect(() => {
    if (accessToken) {
      const expirationDate = new Date().getTime() + parseInt(AsyncStorage.getItem("expiresIn"), 10) * 1000;

      AsyncStorage.setItem("token", accessToken);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());

      navigation.navigate("Main");
    }
  }, [accessToken]);  

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
        <SafeAreaView>
            <View style={{height:80}}/>
            <View style={{ height: 80 }} />
            <Entypo
            style={{ textAlign: "center" }}
            name="spotify"
            size={80}
            color="white"
            />
            <Text
            style={{
                color: "white",
                fontSize: 40,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 40,
            }}
            >
            Millions of Songs Free on spotify!
            </Text>

            <View style={{ height: 80 }} />
            <Pressable
            onPress={()=> handleLogin()}
            style={{
                backgroundColor: "#1DB954",
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: 300,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                marginVertical:10
            }}
              >
             <Text>Sign In with spotify</Text>
           </Pressable>    

           <Pressable
            style={{
                backgroundColor: "#131624",
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: 300,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                flexDirection:"row",
                alignItems:"center",
                marginVertical:10,
                borderColor:"#C0C0C0",
                borderWidth:0.8
            }}
            >
            <MaterialIcons name="phone-android" size={24} color="white" />
            <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with phone number</Text>
         </Pressable>

         <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
        <AntDesign name="google" size={24} color="red" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with Google</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
         <Entypo name="facebook" size={24} color="blue" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Sign In with facebook</Text>
        </Pressable>
        </SafeAreaView>
    </LinearGradient>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})