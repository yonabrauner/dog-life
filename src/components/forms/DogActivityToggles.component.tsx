import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { View, Text } from "react-native";
import { formDogActivity } from "../../screens/walkForm.screen";
import PeeSvg from '../../assets/pee.svg';
import PoopSvg from '../../assets/poop3.svg';

interface Props {
    selectedDogs: string[];
    dogActivities: formDogActivity[];
    toggleActivity: (dog: string, type: "pee" | "poop") => void;
    isInside?: boolean;
}

export function DogActivityToggles({ selectedDogs, dogActivities, toggleActivity, isInside=false }: Props) {
  return(<>
    {selectedDogs.length ? <Text style={[styles.modalTitle, isInside ? null : {alignSelf: 'center', marginRight: 5}]}>select pee/poo</Text> : null}
    {selectedDogs.map(dog => {
      const activity = dogActivities.find(activity => activity.dogName === dog);
      return (
        <View key={dog} style={styles.activityRow}>       
          <Image source={activity?.dogName === 'Ari' ? require('../../assets/Ari-happy.jpeg') : require('../../assets/Cheetah-cool.jpeg') } style={styles.dogImage} />

          <TouchableOpacity
              style={[
                styles.toggleButton,
                activity?.pee ? styles.activeButton : null,
              ]}
              onPress={() => toggleActivity(dog, 'pee')}
          >
              <PeeSvg width={30} height={30} />
          </TouchableOpacity> 
          
          <TouchableOpacity
              style={[
                styles.toggleButton,
                activity?.poop ? styles.activeButton : null,
              ]}
              onPress={() => toggleActivity(dog, 'poop')}
          >
              <PoopSvg width={30} height={30} />
          </TouchableOpacity>
        </View>
      );
    })}
  </>);
}

const styles = StyleSheet.create({
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    alignSelf: 'center',
    marginLeft: -8,
  },
  modalTitle: {
    alignSelf: 'center',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
  },
  toggleButton: {
    paddingHorizontal: 5,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 3,
  },
  activeButton: { backgroundColor: '#53f058ff' },
  dogImage: {
    width: 50,
    height: 50,
    borderRadius: 40, // makes it circular
    marginRight: 3,
    borderWidth: 0.6,
    borderColor: '#9B9B9B',
  },
  svg: {
    maxWidth: 35,
    maxHeight: 35,
  }
});