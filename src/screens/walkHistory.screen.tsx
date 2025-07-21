import React, { act, useEffect, useState } from 'react';
import { AppDispatch } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RootStackParamList } from '../../App'; // adjust path
import { db } from '../firebase/config';
import { format } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllWalks } from '../features/walks/walksSelectors';
import { Walk } from '../features/walks/walksSlice';
import { listenToWalks } from '../features/walks/walksSlice';
import { dogActivity } from '../features/walks/walksSlice';

// type HistoryScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'History'
// >;

export const WalkHistory: React.FC = () => {
  const walks = useSelector(selectAllWalks);
  const dispatch = useDispatch<AppDispatch>();
  // const navigation = useNavigation<HistoryScreenNavigationProp>();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

   useEffect(() => {
    const unsubscribe = dispatch(listenToWalks());
    return () => {
      if (typeof unsubscribe === 'function') {
       unsubscribe();
      }
    } ;
  }, [dispatch]);

 const toggleExpand = (id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(expandedId => expandedId !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: Walk }) => {
    const shortDate = format(new Date(item.date), "EEEE, HH:mm");
    const fullDate = format(new Date(item.date), "dd.MM.yyyy");
    const isExpanded = expandedIds.includes(item.id);
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.item}>
          <Text style={styles.walker}>Walker: {item.walker}</Text>
          <Text style={styles.date}>{shortDate}</Text>
          <Text style={styles.dogs}>Dogs: {item.dogs.join(', ')}</Text>

          {isExpanded && (
            <View style={styles.expanded}>
              <Text style={styles.detail}>Duration: {item.duration}</Text>
              <Text style={styles.detail}>Date: {fullDate}</Text>
              {item.dogActivities?.map((activity: dogActivity) => (
                <View key={activity.dog} style={styles.activityRow}>
                  <Text style={styles.dogName}>{activity.dog}:</Text>
                  <Text style={[styles.activity, activity.pee && styles.active]}>
                    Pee
                  </Text>
                  <Text style={[styles.activity, activity.poop && styles.active]}>
                    Poop
                  </Text>
                </View>
              ))}
              {item.notes ? <Text style={styles.detail}>📝 {item.notes}</Text> : null}
              </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
  
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']}>
      <FlatList
        data={walks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  item: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
   walker: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  dogs: {
    fontSize: 14,
    marginBottom: 5,
  },
  expanded: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dogName: {
    fontWeight: '600',
    marginRight: 10,
  },
  activity: {
    marginRight: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  active: {
    backgroundColor: '#90ee90',
    borderColor: '#66cc66',
  },
  notes: {
    marginTop: 6,
    fontStyle: 'italic',
  },
  button: {
    marginBottom: 100,
  },
  buttonText: {
    
  }
});