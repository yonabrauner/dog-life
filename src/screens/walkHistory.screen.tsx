import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalkList } from '../components/WalkList.component';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllWalks } from '../features/walks/walksSelectors';
``

export function WalkHistory() {
  const walks = useSelector(selectAllWalks);
  return (
    <SafeAreaView edges={['bottom', 'left', 'right', 'top']} style={styles.container}>
      <Text style={styles.heading}>{"Walks History"}</Text>
      <WalkList data={walks}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily: "Quicksand_700Bold",
    marginBottom: 20,
  },
});
