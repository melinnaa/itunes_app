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
                <TextInput placeholder="Search music" value={musicInput} onChangeText={setMusicInput} style={[styles.textInput, {marginRight: 20}]}></TextInput>
                <Button onPress={() => findMusic(musicInput)} title={"Search"} color="black"></Button>
            </View>

            <FlatList
            data={musics}
            renderItem={({item}) => <Text value={item.trackName} onPress={() => handleMusicSelected(item)} style={styles.text}>{item.trackName}</Text>}
            keyExtractor={item => item.trackId}
            />

            <Button onPress={() => show()}></Button>
        </ScrollView>
    );

    function handleMusicSelected(item){
       const obj = filterMusicDetails(item);
       navigation.navigate("ShowScreen", { musicDetails: obj })
    }

    function filterMusicDetails(details){
        return {
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
      backgroundColor: '#FFF7E4',
      padding: 15,
      paddingBottom: 20
    },

    textInput: {
        fontSize: 18,
        backgroundColor: "white",
        padding: 8,
        marginBottom: 15,
    },

    searchBlock: {
        flex: 1,
        flexDirection: 'row'
    },

    text: {
        fontSize: 18,
        padding: 4 
    }

});