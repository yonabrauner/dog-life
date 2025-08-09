import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimeSinceLastWalk } from '../features/walks/walksSelectors';
import { AppDispatch } from '../store/store';
import { DogActivityCard } from '../components/DogActivityCard.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { subscribeToWalks } from '../api/walks';
import { selectAllDogs } from '../features/dogs/dogsSelectors';
import { LastWalkCard } from '../components/LastWalkCard.component';
import { TimeSinceLastWalkCard } from '../components/TimeSinceLastWalkCard.component';
import { TopWalkerCard } from '../components/TopWalkerCard.component';
import { DogsLastActivities } from '../components/DogsLastActivities.component';

export function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  
  
  // refresh every minute
  const [, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const unsubscribe = subscribeToWalks(dispatch);
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [dispatch]);
  

  return (
    <SafeAreaView edges={['bottom', 'left', 'right', 'top']} style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <Text style={styles.heading}>Overview</Text>

        <View style={styles.dogRow}>
          <Image source={require('../assets/Ari-happy.jpeg')} style={styles.dogImage} />
          <Image source={require('../assets/Ari-cute-confused.jpeg')} style={styles.dogImage} />
          <Image source={require('../assets/Cheetah-cool.jpeg')} style={styles.dogImage} />
        </View>

        <TimeSinceLastWalkCard />

        <TopWalkerCard />
        
        <DogsLastActivities />
        
        <LastWalkCard />

        <Text style={styles.message}>Ready for the next walk? 🐾</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  dogRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dogImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // makes it circular
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    marginTop: 30,
    fontSize: 18,
    fontStyle: 'italic',
  },
});

