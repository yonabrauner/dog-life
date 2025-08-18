import React, { useState } from "react";
import { MultiSelect } from "react-native-element-dropdown";
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import { selectAllDogs } from "../../features/dogs/dogsSelectors";
import { FORMBUTTONSIZE } from "../../constants/FormConstants";
import DogSvg from "../../assets/dog-face.svg";
import { MyTheme } from "../../constants/Theme";
import { formDogActivity } from "../../screens/walkForm.screen";
import { DogActivityToggles } from "./DogActivityToggles.component";


interface Props {
    onChange: (dogs: string[]) => void;
    selectedDogs: string[];
    dogActivities: formDogActivity[];
    toggleActivity: (dog: string, type: "pee" | "poop") => void
}


export function DogsMultiSelect({ onChange, selectedDogs, dogActivities, toggleActivity }: Props) {
  const dogs = useSelector(selectAllDogs);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleDog = (dogName: string) => {
    if (selectedDogs.includes(dogName)) {
      onChange(selectedDogs.filter(dog => dog !== dogName));
    } else {
      onChange([...selectedDogs, dogName]);
    }
  };

  const renderDog = ( dogName: string ) => {
    const isSelected = selectedDogs.includes(dogName);
    return (
      <TouchableOpacity
        style={[styles.dogItem, isSelected && styles.selectedDog]}
        onPress={() => toggleDog(dogName)}
      >
        <Image source={dogName == "Ari" ? require('../../assets/Ari-happy.jpeg') : require('../../assets/Cheetah-cool.jpeg')} style={styles.dogImage} />
        <Text style={styles.dogName}>{dogName}</Text>
      </TouchableOpacity>
    );
  };

  return (<>
    <TouchableOpacity
      style={[styles.button, selectedDogs.length ? null : styles.unfulfilled]}
      onPress={() => setModalVisible(true)}
    >
      <View style={styles.iconContainer}>
        <DogSvg width={FORMBUTTONSIZE * 0.8} height={FORMBUTTONSIZE * 0.8} />
      </View>
    </TouchableOpacity>

    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Dogs</Text>
              <FlatList
                data={dogs}
                keyExtractor={item => item.name}
                renderItem={listItem => renderDog(listItem.item.name)}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 20 }}
              />

              <DogActivityToggles
                  selectedDogs={selectedDogs}
                  dogActivities={dogActivities}
                  toggleActivity={toggleActivity}
                  isInside={true}
              />
              <Text style={styles.closeLabel}>tap outside to close</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  </>);
}

  const styles = StyleSheet.create({
  button: {
    width: FORMBUTTONSIZE,
    height: FORMBUTTONSIZE,
    borderRadius: 12,
    backgroundColor: '#FFB84D', // warm & playful
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Android shadow
  },
  unfulfilled: {
    borderWidth: 5,
    borderColor: '#fc5411ff',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
   buttonText: {
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: MyTheme.colors.surface,
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Quicksand_700Bold',
  },
  dogItem: {
    flex: 1 / 2,
    margin: 6,
    alignItems: 'center',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDog: {
    borderStyle: 'dashed',
    borderColor: MyTheme.colors.primary, // your primary color or highlight color
  },
  dogImage: {
    width: 130,
    height: 130,
    borderRadius: 20,
  },
  dogName: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Quicksand_400Regular',
  },
  closeLabel: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 3,
    color: MyTheme.colors.textSecondary,
  },
  // closeButton: {
  //   // marginTop: 10,
  //   backgroundColor: MyTheme.colors.primary,
  //   borderRadius: 12,
  //   paddingVertical: 12,
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   width: '40%',
  // },
  // closeButtonText: {
  //   fontFamily: 'Inter_400Regular',
  //   color: '#fff',
  //   fontWeight: '700',
  //   fontSize: 16,
  // },
});
