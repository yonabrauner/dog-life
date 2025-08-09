import React from "react";
import { useSelector } from "react-redux";
import { selectAllDogs } from "../features/dogs/dogsSelectors";
import { DogActivityCard } from "./DogActivityCard.component";
import { StyleSheet, View } from "react-native";


export function DogsLastActivities() {
    const dogs = useSelector(selectAllDogs);

    return(
        <View style={styles.container}>
            {dogs.map(dog => (
                <DogActivityCard key={dog.id} dog={dog} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
})