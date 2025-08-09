import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DogActivity } from '../features/walks/walksSlice';

export default function WalkActivityRow({ activity }: { activity: DogActivity }) {
  return (
    <View style={styles.row}>
      <Text style={styles.dog}>{activity.dog.name}:</Text>
      <Text style={[styles.activity, activity.pee && styles.active]}>Pee</Text>
      <Text style={[styles.activity, activity.poop && styles.active]}>Poop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 2,
  },
  dog: { fontWeight: 'bold' },
  activity: { color: '#888' },
  active: { color: 'green', fontWeight: 'bold' },
});