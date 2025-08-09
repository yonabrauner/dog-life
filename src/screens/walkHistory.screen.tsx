import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalkList } from '../components/WalkList.component';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllWalks } from '../features/walks/walksSelectors';


export function WalkHistory() {
  const walks = useSelector(selectAllWalks);
  return (
    <SafeAreaView edges={['bottom', 'left', 'right', 'top']} style={styles.container}>
      {/* <View style={styles.header}> */}
        <Text style={styles.heading}>{"Walks History"}</Text>
      {/* </View> */}
      {/* <Appbar.Header><Appbar.Content title={"Walks History"}/></Appbar.Header> */}
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
