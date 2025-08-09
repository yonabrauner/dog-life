import React from "react";
import { useSelector } from "react-redux";
import { selectTopWalker } from "../features/walks/walksSelectors";
import { StyleSheet, Text, View } from "react-native";


export function TopWalkerCard(){
    const topWalker = useSelector(selectTopWalker);
    return(
        <View style={styles.card}>
            <Text style={styles.stat}>{topWalker.walker} : {topWalker.count}</Text>
            <Text style={styles.label}>most Walks</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    },
    stat: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    },
    label: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
    },
})