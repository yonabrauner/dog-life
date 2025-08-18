import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DogActivity } from '../features/walks/walksSlice';
import PeeSvg from '../assets/pee.svg'
import PoopSvg from '../assets/poop3.svg';


export default function WalkActivityRow({ activity }: { activity: DogActivity }) {
  return (
    <View key={activity.id} style={styles.row}>       
      <Image source={activity.dog.name === 'Ari' ? require('../assets/Ari-happy.jpeg') : require('../assets/Cheetah-cool.jpeg') } style={styles.dogImage} />

      <View style={[styles.toggleButton, activity.pee ? styles.activeButton : null]}>
          <PeeSvg width={30} height={30} />
      </View> 
      
      <View style={[styles.toggleButton, activity.poop ? styles.activeButton : null]}>
          <PoopSvg width={30} height={30} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 2 ,
    marginVertical: 2,
  },
  dogImage: {
    width: 40,
    height: 40,
    borderRadius: 40, // makes it circular
    borderWidth: 0.6,
    borderColor: '#9B9B9B',
    marginRight: 4,
  },
  toggleButton: {
    paddingHorizontal: 5,
    paddingVertical: 6,
    backgroundColor: '#e6ccb2',
    borderRadius: 10,
    marginHorizontal: 3,
  },
  activeButton: { backgroundColor: '#53f058ff' },
  dog: { fontWeight: 'bold' },
  activity: { color: '#888' },
  active: { color: 'green', fontWeight: 'bold' },
});