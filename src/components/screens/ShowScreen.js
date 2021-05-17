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
    <View>
        <View> 
            <Text>Track: {musicDetails.trackName}</Text> 
            <Image source={{uri: musicDetails.image}} style = {{height: 200, width:200, resizeMode : 'stretch', margin: 5 }}></Image>       
            <Text>Artist: {musicDetails.artistName}</Text>  
            <Text>Album: {musicDetails.album}</Text>  
            <Text>Genre: {musicDetails.genre}</Text>
            <View>
                <Text>Rating:</Text>
                <TextInput placeholder="My rate /5" onChangeText={setRating} defaultValue={musicDetails.rating}></TextInput>
            </View>
            <Button title="Save" onPress={() => add()} /> 
        </View> 
        <Button title="Go back" onPress={() => navigation.goBack()} /> 
    </View>
    );

    function setRating(input){
        setMusicDetails(prevState => {
            return { ...prevState, rating: input }
        })
    }

    function add(){
        dispatch(addMusic(musicDetails));
    }

}