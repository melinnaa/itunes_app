import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { musicSelector } from "../../slices/MusicSlice.js";
import { addMusic } from "../../slices/MusicSlice.js";

export function ShowScreen({route, navigation}) {
    const dispatch = useDispatch();

    const [musicDetails, setMusicDetails] = useState(route.params ? route.params.musicDetails : "")

    return (
    <View style={styles.container}>
            <Text style={styles.text}>{musicDetails.trackName}</Text> 
            <Image source={{uri: musicDetails.image}} style={{height: 200, width:200, resizeMode : 'stretch', margin: 5, alignSelf:'center' }}></Image>       
            <View>
                <Text style={styles.text}>Artist: {musicDetails.artistName}</Text>  
                <Text style={styles.text}>Album: {musicDetails.album}</Text>  
                <Text style={styles.text}>Genre: {musicDetails.genre}</Text>
            </View>
            <View style={{flexDirection:"row", alignItems: "center"}}>
                <Text style={styles.text}>Rating:</Text>
                { route.params.from == "remote" &&
                <TextInput placeholder="My rate /5" onChangeText={setRating} defaultValue={musicDetails.rating} style={styles.textInput} placeholderTextColor="gray"></TextInput>
                }
                { route.params.from == "local" &&
                <Text style={styles.text}>{musicDetails.rating}</Text>
                }
                </View>
            <Button title="Save" onPress={() => add()} color="#C4449F"/> 
    </View>
    );

    function setRating(input){
        setMusicDetails(prevState => {
            return { ...prevState, rating: input }
        })
    }

    function add(){
        dispatch(addMusic(musicDetails));
        navigation.goBack()
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#272727',
        color: 'white',
        justifyContent: 'space-evenly'
    },

    textInput: {
        fontSize: 18,
        padding: 8,
        color: 'white'
    },

    searchBlock: {
        margin: 0,
        shadowOffset:{  width: 0,  height: 20,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 15
    },

    text: {
        fontSize: 18,
        padding: 4,
        color: 'white'
    },

    searchLine: {
        flexDirection: 'row',
        color: 'white',
    }

});