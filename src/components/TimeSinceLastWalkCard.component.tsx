import React from "react";
import { useSelector } from "react-redux";
import { selectTimeSinceLastWalk } from "../features/walks/walksSelectors";
import { StyleSheet, Text, View } from "react-native";
import { MyTheme } from "../constants/Theme";

export function TimeSinceLastWalkCard() {
    const timeSinceLastWalk = useSelector(selectTimeSinceLastWalk);

    return(
        <View style={styles.card}>
            <Text style={styles.stat}>{timeSinceLastWalk || "no data"}</Text>
            <Text style={styles.label}>Time Since Last Walk</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: MyTheme.colors.primary,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stat: {
    fontSize: 28,
    fontFamily: "Quicksand_700Bold",
    color: MyTheme.colors.text,  },
  label: {
    fontSize: 16,
    color: '#e6ccb2',
    fontFamily: "Quicksand_600SemiBold",
    marginTop: 5,
  },
})