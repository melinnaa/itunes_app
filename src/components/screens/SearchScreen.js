import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { musicSelector } from "../../slices/MusicSlice.js";
import { addMusic } from "../../slices/MusicSlice.js";
import { ShowScreen } from "./ShowScreen.js";

export function SearchScreen({navigation}){
    const [musics, setListMusics] = useState();
    const [musicInput, setMusicInput] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchBlock}>
                <TextInput placeholder="Search music" value={musicInput} onChangeText={setMusicInput} style={[styles.textInput]}></TextInput>
                <Button onPress={() => findMusic(musicInput)} title={"Search"} color="#C4449F"></Button>
            </View>
            <FlatList
            data={musics}
            renderItem={({item}) => 
            <View onClick={() => handleMusicSelected(item)} style={styles.searchLine}>
                <Image source={{uri: item.artworkUrl100}} style = {{height: 70, width: 70, resizeMode : 'stretch', margin: 5 }}></Image>       
                <Text value={item.trackName} style={styles.text}>{item.trackName} </Text>    
                <Text value={item.artistName} style={styles.text}>{item.artistName}</Text>
            </View>}
            keyExtractor={item => item.trackId}
            />
        </ScrollView>
    );

    function handleMusicSelected(item){
       const obj = filterMusicDetails(item);
       navigation.navigate("ShowScreen", { musicDetails: obj })
    }

    function filterMusicDetails(details){
        return {
            'trackId': details.trackId,
            'trackName': details.trackName,
            'image': details.artworkUrl100,
            'artistName': details.artistName,
            'album': details.collectionName,
            'genre': details.primaryGenreName,
            'rating': ""
        }
    }

    function findMusic(title){
        const musics = findMusicsByInput(title);
        Promise.resolve(musics).then((response) => {
            setListMusics(response);
        });         
    }

    async function findMusicsByInput(input){
        try {
            const resp = await axios.get('https://itunes.apple.com/search?term='+input+'&attribute=allArtistTerm&attribute=songTerm&entity=musicTrack')
            return resp.data.results
        } catch (err) {
            console.error(err);
        }
    }     
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#272727',
        color: 'white'
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
        justifyContent: 'space-between'
    }

});