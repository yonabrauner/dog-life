import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { formDogActivity } from "../../screens/walkForm.screen";


interface Props {
    selectedDogs: string[];
    dogActivities: formDogActivity[];
    toggleActivity: (dog: string, type: "pee" | "poop") => void;
}

export function DogActivityToggles({ selectedDogs, dogActivities, toggleActivity }: Props) {
    return(
        <>
    {selectedDogs.map(dog => {
        const activity = dogActivities.find(activity => activity.dogName === dog);
        return (
            <View key={dog} style={styles.activityRow}>       
                <Text style={styles.dogName}>{dog}</Text>
                <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      activity?.pee ? styles.activeButton : null,
                    ]}
                    onPress={() => toggleActivity(dog, 'pee')}
                >
                    <Text style={styles.buttonText}>Pee</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      activity?.poop ? styles.activeButton : null,
                    ]}
                    onPress={() => toggleActivity(dog, 'poop')}
                >
                    <Text style={styles.buttonText}>Poop</Text>
                </TouchableOpacity>
            </View>
              );
            })}
        </>
    );
}

const styles = StyleSheet.create({
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dogName: { fontSize: 16, marginRight: 10 },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginHorizontal: 5,
  },
  activeButton: { backgroundColor: '#90ee90' },
  buttonText: { fontSize: 14 },
   dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});