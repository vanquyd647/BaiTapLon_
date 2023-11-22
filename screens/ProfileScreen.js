import { Image, ScrollView, StyleSheet, Text, View , Pressable} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const navigation = useNavigation();
  

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("token");
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPlaylists(response.data.items);
      } catch (error) {
        console.error("Error retrieving playlists:", error);
      }
    };

    getPlaylists();
  }, []);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    console.log("hi");
    const accessToken = await AsyncStorage.getItem("token");
    console.log("accesssssed token", accessToken);
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (error) {
      console.log("error my friend", error.message);
    }
  };
  console.log(playlists);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ padding: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{ uri: userProfile?.images[0].url }}
            />
            <View>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                {userProfile?.display_name}
              </Text>
              <Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>
                {userProfile?.email}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "500",
            marginHorizontal: 12,
          }}
        >
          Danh sách phát
        </Text>

        <View style={{padding:15}}>
        <View
        >
          <Pressable
          onPress={() => navigation.navigate("Liked")}
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              // marginHorizontal: 10,
              marginVertical: 8,
              // backgroundColor: "#202020",
              borderRadius: 4,
              
              elevation: 3,
            }}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]} style={{ borderRadius: 4 }}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                  
                }}
              >
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text style={{color:"white",marginTop:7}}>
              Bài hát đã thích
            </Text>
          </Pressable>
        </View>
          {playlists.map((item, index) => (
            <View style={{flexDirection:"row",alignItems:"center",gap:8,marginVertical:10}}>
              
              <Image
                source={{
                  uri:
                    item?.images[0]?.url ||
                    "https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=800",
                }}
                style={{ width: 55, height: 55, borderRadius: 4 }}
              />
              <View>
                <Text style={{color:"white"}}>{item?.name}</Text>
                <Text  style={{color:"white",marginTop:7}}>0 người theo dõi</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
