import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format, isToday, compareDesc } from 'date-fns';
import { selectAllWalks, selectLastWalk } from '../features/walks/walksSelectors';
import { listenToWalks } from '../features/walks/walksSlice';
import { AppDispatch } from '../store/store';

export const HomeScreen: React.FC = () => {
    const walks = useSelector(selectAllWalks);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const unsubscribe = dispatch(listenToWalks());
        return () => {
          if (typeof unsubscribe === 'function') {
           unsubscribe();
          }
        } ;
      }, [dispatch]);
    
    const todaysWalks = walks.filter(walk =>
       isToday(new Date(walk.date))
    );

    const lastWalk = useSelector(selectLastWalk);

    const lastWalkTime = lastWalk ?
        format(new Date(lastWalk.date), 'EEEE, HH:mm')
        : 'No walks yet';

        return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dog Life Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.stat}>{todaysWalks.length}</Text>
        <Text style={styles.label}>Walks Today</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stat}>{lastWalkTime}</Text>
        <Text style={styles.label}>Last Walk</Text>
      </View>
      <Text style={styles.message}>Ready for the next walk? 🐾</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
  message: {
    marginTop: 30,
    fontSize: 18,
    fontStyle: 'italic',
  },
});

