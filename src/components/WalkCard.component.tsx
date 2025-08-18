import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { DogActivity, Walk } from '../features/walks/walksSlice';
import { WalkCardCalendar } from "./WalkCardCalendar.component";
import WalkActivityRow from "./WalkActivityRow.component";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MyTheme } from "../constants/Theme";


interface Props {
  walk: Walk;
  expanded: boolean;
  onToggle: () => void;
}


export function WalkCard( { walk, expanded, onToggle }: Props ) {
    const shortDate = format(new Date(walk.date), 'EEEE, HH:mm');
    const fullDate = format(new Date(walk.date), 'yyyy-MM-dd');

    return (
        <TouchableOpacity
        style={styles.card}
        onPress={onToggle}
        activeOpacity={0.8}
        >
          <View style={styles.topRow}>
            <View style={styles.leftCol}>
              <Text style={styles.walker}>Walker: {walk.walkerName}</Text>
              <Text style={styles.detail}>{shortDate}</Text>

            </View>

            <View style={styles.rightCol}>
              {walk.dogActivities?.filter((a): a is DogActivity => 'dog' in a).map((activity) => (
                  <WalkActivityRow key={activity.id} activity={activity} />
              ))}
            </View>
          </View>

          {expanded ? (
            <View style={styles.expanded}>
              <View style={styles.topRow}>
                <View style={styles.leftCol}>
                  {/* <WalkCardCalendar expanded={expanded} fullDate={fullDate}/> */}
                  <Text style={styles.detail}>Duration: {walk.duration} mins</Text>                  
                  <Text style={styles.detail}>Date: {fullDate}</Text>
                </View>

                <View style={styles.rightCol}>
                  {walk.notes ? <Text style={[styles.detail, {}]}>📝 {walk.notes}</Text> : null}
                </View>
              </View>
              <Text style={styles.label}>tap to collapse <Ionicons name="chevron-up" /></Text>
            </View>
          ) : (
            <Text style={styles.label}>tap to expand <Ionicons name="chevron-down" /></Text>
          )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#e6ccb2',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    gap: -10,
    marginVertical: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  leftCol: {
    flex: 1,
    gap: 5,
    justifyContent: 'space-evenly',
  },
  rightCol: {
    flex: 1,
    gap: 5,
    marginRight: 8,
    textAlign: 'center',
    alignItems: 'center',
  },
  walker: {
    fontFamily: "Quicksand_700Bold",
    color: MyTheme.colors.text,
  },
  expanded: {
    // marginTop: -12
  },
  detail: {
    fontFamily: "Quicksand_400Regular",
    color: MyTheme.colors.textSecondary,
  },
  label: { 
    color: 'gray',
    marginTop: 3,
    textAlign: "center",
  },
});