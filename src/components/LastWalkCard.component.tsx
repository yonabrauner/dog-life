import { StyleSheet, Text, View } from "react-native";
import { WalkList } from "./WalkList.component";
import { useSelector } from "react-redux";
import { selectLastWalk } from "../features/walks/walksSelectors";



export function LastWalkCard() {
    const lastWalk = useSelector(selectLastWalk);
    
    return (
        <View style={styles.card}>
            {lastWalk ? 
            <WalkList data={[lastWalk]} />
            : <Text style={styles.stat}>No Walks Yet</Text>}
            <Text style={styles.label}>Last Walk</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
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
}});