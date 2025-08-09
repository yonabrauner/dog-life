import { useSelector } from "react-redux";
import { makeSelectTimeSinceLastActivity } from "../features/walks/walksSelectors";
import { StyleSheet, Text, View } from "react-native";
import { Dog } from "../features/dogs/dogsSlice";

export function DogActivityCard( { dog } : {dog: Dog} ) {
  const pee = useSelector(makeSelectTimeSinceLastActivity(dog.name, 'pee'));
  const poop = useSelector(makeSelectTimeSinceLastActivity(dog.name, 'poop'));

  return (
    <View key={dog.id} style={styles.card}>
      <Text style={styles.dogName}>{dog.name}</Text>
      <Text style={styles.activity}>Pee: {pee || 'No record'}</Text>
      <Text style={styles.activity}>Poop: {poop || 'No record'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dogImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // makes it circular
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  card: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '40%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dogName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activity: {
    fontSize: 16,
    color: '#555',
  },
});

