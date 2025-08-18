import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { submitWalk } from "../features/walks/walksSlice";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { WalkerDropdown } from "../components/forms/WalkerDropdown.component";
import { DogsMultiSelect } from "../components/forms/DogsMultiSelect.component";
import { DateTimePickerField } from "../components/forms/DateTimePickerField.component";
import { DurationInput } from "../components/forms/DurationInput.component";
import { NotesInput } from "../components/forms/NotesInput.component";
import { DogActivityToggles } from "../components/forms/DogActivityToggles.component";
import { selectAllDogs } from "../features/dogs/dogsSelectors";
import { SkiddingDog } from "../components/animations/skiddingDog";
import { Dog } from "../features/dogs/dogsSlice";
import { Ionicons } from "@expo/vector-icons";
import { MyTheme } from "../constants/Theme";


export interface formDogActivity {
  dogName: string;
  poop: boolean;
  pee: boolean;
}

export function WalkForm() {
  const [walkerName, setWalkerName] = useState('');
  const [duration, setDuration] = useState(15);
  const [notes, setNotes] = useState('');
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const [dogActivities, setDogActivities] = useState<formDogActivity[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [animatedDogs, setAnimatedDogs] = useState<{id: number, leftToRight: boolean, dog: Dog}[]>([]);
  const dogs = useSelector(selectAllDogs);
  const dispatch = useDispatch<AppDispatch>();

  
  const toggleActivity = (dog: string, type: 'pee' | 'poop') => {
    setDogActivities(prev => {
      const updated = [...prev];
      const index = updated.findIndex(activity => activity.dogName === dog);

      if (index >= 0) {
        updated[index][type] = !updated[index][type];
      } else {
        updated.push({ dogName: dog , pee: type === 'pee', poop: type === 'poop' });
      }
      return updated;
    });
  };


  const spawnDog = (leftToRight: boolean, dog: Dog | undefined) => {
    if (dog){
      const id: number = Math.random() * Date.now();
      setAnimatedDogs(prev => [...prev, {id, leftToRight, dog}]);
    } else {
      console.error("dog is undefined..");
    }
  };

  const handleDogFinish = (id: number) => {
    setTimeout(() => {
      setAnimatedDogs(prev => prev.filter(d => d.id !== id));
    }, 0);
  };


  const handleDogSelection = (dogsSelected: string[]) => {
    const selected: string | undefined  = dogsSelected.find(dog => !selectedDogs.includes(dog));
    const deselected: string | undefined = selectedDogs.find(dog => !dogsSelected.includes(dog));
    const dog: Dog | undefined = selected ? dogs.find(dog => dog.name == selected) : dogs.find(dog => dog.name == deselected);

    if (selected){
      spawnDog(true, dog);
    }
    
    if (deselected){
      spawnDog(false, dog);
    }
    
    setSelectedDogs(dogsSelected);
    // Keep dogActivities synced (remove ones not selected)
    setDogActivities(prev => prev.filter(activity => dogsSelected.includes(activity.dogName)));
    // Add default entries for new dogs
    dogsSelected.forEach(dog => {
      if (!dogActivities.some(activity => activity.dogName === dog)) {
        setDogActivities(prev => [...prev, { dogName: dog , pee: false, poop: false }]);
      }
    });
  };

  

  const handleSubmit = async () => {
    const dateString = date.getTime();
    
    if (!walkerName || !selectedDogs.length) {
        Alert.alert("please select walker name and select dogs!");
        return;
    }

    if (!duration) {
      Alert.alert("duration cannot be 0!");
      return;
    }

    await dispatch(submitWalk({ walkerName, dogActivities, duration: duration, notes, date: dateString}))
  
    setDuration(15);
    setNotes('');
    setDogActivities(prev => prev.map(activity => ({ ...activity, pee: false, poop: false})));
    setDate(new Date());
    Alert.alert("Walk added!");

  };


    return(
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right', 'top']}>
        
        <Text style={styles.heading}>{"New Walk"}</Text>

        {/* Top row */}
        <View style={styles.topRow}>
          {/* Left column */}
          <View style={styles.leftCol}>
            <WalkerDropdown
              value={walkerName}
              onChange={setWalkerName}
            />
          </View>

          {/* Top right */}
          <View style={styles.rightCol}>
            <DogsMultiSelect
              onChange={handleDogSelection}
              selectedDogs={selectedDogs}
              dogActivities={dogActivities}
              toggleActivity={toggleActivity}
            />
          </View>
        </View>
        
        {/* Middle row  */}
        <View style={styles.topRow}>
          {/* Left column */}
          <View style={styles.leftCol}>
            <DateTimePickerField
              date={date}
              onChange={setDate}
            />
          </View>

          {/* Right column */}
          <View style={styles.rightCol}>
            <DogActivityToggles
              selectedDogs={selectedDogs}
              dogActivities={dogActivities}
              toggleActivity={toggleActivity}
            />
          </View>
        </View>

        {/* Bottom row  */}
        <View style={styles.topRow}>
          {/* Left column */}
          <View style={styles.leftCol}>
            <DurationInput
              value={duration}
              onChange={setDuration}
            />
          </View>

          {/* Right column */}
          <View style={styles.rightCol}>
            <NotesInput
              value={notes}
              onChange={setNotes}
            />
          </View>
        </View>

        <TouchableOpacity onPressOut={handleSubmit} style={styles.submitButton}>
          {/* <Ionicons name="paw" size={22} color="white" /> */}
          <Text style={styles.submitText}>Save Walk!</Text>
        </TouchableOpacity>
        {/* <Button title="Save Walk" onPress={handleSubmit} style={styles.submitButton}/> */}
        
        {animatedDogs.map( animated => 
          <SkiddingDog key={animated.id} leftToRight={animated.leftToRight} dog={animated.dog} onFinish={() => handleDogFinish(animated.id)} />
        )}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  topRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 13,
  },
  leftCol: {
    flex: 1,
    gap: 5,
  },
  rightCol: {
    flex: 1,
    gap: 5,
  },
  submitButton: {
    backgroundColor: MyTheme.colors.primary,
    width: '40%',
    marginTop: -10,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 4,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
  },
});