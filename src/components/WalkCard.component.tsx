import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { DogActivity, Walk } from '../features/walks/walksSlice';
import WalkActivityRow from "./WalkActivityRow.component";
import Ionicons from 'react-native-vector-icons/Ionicons'


interface Props {
  walk: Walk;
  expanded: boolean;
  onToggle: () => void;
}


export function WalkCard( { walk, expanded, onToggle }: Props ) {
    const shortDate = format(new Date(walk.date), 'EEEE, HH:mm');
    const fullDate = format(new Date(walk.date), 'dd.MM.yyyy');


    return (
        <TouchableOpacity
        style={styles.card}
        onPress={onToggle}
        activeOpacity={0.8}
        >
          <Text style={styles.walker}>Walker: {walk.walkerName}</Text>
          <Text style={styles.date}>{shortDate}</Text>
          <Text style={styles.dogs}>
            Dogs: {walk.dogActivities.map(activity => {
                if ('dog' in activity && activity.dog.name)
                  return activity.dog.name;
              }).join(', ')}
          </Text>
          {!expanded && (
            <Text style={styles.label}>tap to expand <Ionicons name="chevron-down" /></Text>
          )}

          {expanded && (
            <View style={styles.expanded}>
            <Text style={styles.detail}>Duration: {walk.duration} mins</Text>
            <Text style={styles.detail}>Date: {fullDate}</Text>
            {walk.dogActivities?.filter((a): a is DogActivity => 'dog' in a).map((activity) => (
                <WalkActivityRow key={activity.id} activity={activity} />
            ))}
            {walk.notes ? <Text style={styles.detail}>📝 {walk.notes}</Text> : null}
            <Text style={styles.label}>tap to collapse <Ionicons name="chevron-up" /></Text>
            </View>
          )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    width: '100%',
  },
  walker: { fontWeight: 'bold' },
  date: { color: '#666' },
  dogs: { marginVertical: 5 },
  expanded: { marginTop: 8 },
  detail: { marginVertical: 2 },
  label: {color: 'gray', textAlign: "right"}
});