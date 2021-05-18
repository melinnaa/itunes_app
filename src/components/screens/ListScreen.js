import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { musicSelector } from "../../slices/MusicSlice.js";
import { addMusic } from "../../slices/MusicSlice.js";

export function ListScreen({route, navigation}){
    const musics = useSelector(musicSelector);

    if (musics.length > 0){
        return (
        <ScrollView contentContainerStyle={styles.container}>
            <FlatList
            data={musics}
            renderItem=
            {
                ({item}) => (
                    
                <View >
                    <TouchableOpacity
                    style={[styles.button, styles.searchLine]}
                    onPress={() => handleMusicSelected(item)}>
                        <Image source={{uri: item.image}} style={{height: 100, width: 100, resizeMode : 'stretch', margin: 5 }}></Image>       
                        <View>
                            <Text value={item.trackName} style={styles.text}> {item.trackName} </Text>
                            <Text value={item.artistName} style={styles.text}> {item.artistName} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
               
                )
        
            }
            keyExtractor={item => item.trackId}/>
        </ScrollView>
        )
    }

    else {
        return (
        <View style={styles.container2}>
            <Text style={styles.text}> No musics yet </Text>
        </View>)
    }
    

    function handleMusicSelected(item){
       navigation.navigate("ShowScreen", { musicDetails: item, from:'local' })
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#272727',
        color: 'white'
    },

    container2: {
        width: '100%',
        height: '100%',
        backgroundColor: '#272727',
        justifyContent: 'center',
        alignItems: 'center'
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