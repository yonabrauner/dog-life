import React, { act, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, StyleSheet, Button, Text, Image } from "react-native";
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
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

export interface formDogActivity {
  dogName: string;
  poop: boolean;
  pee: boolean;
}

export function WalkForm() {
  const [walkerName, setWalkerName] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const [dogActivities, setDogActivities] = useState<formDogActivity[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [animatedDogs, setAnimatedDogs] = useState<{id: number, leftToRight: boolean, dog: Dog}[]>([]);
  const dogs = useSelector(selectAllDogs);
  const displayedValue = duration === "" ? "" : duration;
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

  const renderLabel = () => {
    if (selectedDogs.length > 0) {
      const dogNames = dogs.filter(dog => selectedDogs.includes(dog.name))
        .map(dog => dog.name)
        .join(', ');
      return dogNames;
    }
    return 'Select dogs';
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false); // Close on cancel
      return;
    }
    if (selectedDate) {
      setDate(prev => new Date(selectedDate.setHours(prev.getHours(), prev.getMinutes())));
    }
    setShowDatePicker(false);
    setShowTimePicker(true); // Open time picker after date selection
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === 'dismissed') {
      setShowTimePicker(false); // Close on cancel
      return;
    }
    if (selectedTime) {
      setDate(prev => {
        const newDate = new Date(prev);
        newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
        return newDate;
      });
    }
    setShowTimePicker(false);
  };

  const handleSubmit = async () => {
    const dateString = date.getTime();
    const finalDuration = duration === "" ? "15" : duration;
    // const finalDogActivities: submitDogActivity[] = dogActivities.map(activity => {
    //   const dogId = dogs.find(dog => dog.name === activity.dogName )!.id;
    //   return {dogId: dogId, pee: activity.pee, poop: activity.poop};
    // })

    if (!walkerName || !selectedDogs.length) {
        Alert.alert('plase enter walker name and select dogs!');
        return;
    }

    await dispatch(submitWalk({ walkerName, dogActivities, duration: Number(finalDuration), notes, date: dateString}))
  
    setDuration('');
    setNotes('');
    setDogActivities([]);
    setDate(new Date());
    setShowDatePicker(false);
    setShowTimePicker(false);
    Alert.alert("Walk added!");

  };


    return(
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <Text style={styles.heading}>{"New Walk"}</Text>
        <WalkerDropdown
          value={walkerName}
          onChange={setWalkerName}
        />
       
        <DogsMultiSelect
          value={selectedDogs}
          onChange={handleDogSelection}
          placeholder={renderLabel}
          selected={selectedDogs}
        />
        
        <DogActivityToggles
          selectedDogs={selectedDogs}
          dogActivities={dogActivities}
          toggleActivity={toggleActivity}
        />
        
        <DateTimePickerField
          date={date}
          showDatePicker={showDatePicker}
          showTimePicker={showTimePicker}
          setShowDatePicker={setShowDatePicker}
          setShowTimePicker={setShowTimePicker}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
        />
     
        <DurationInput
          placeholder="Duration (minutes) - 15"
          value={displayedValue}
          onChange={setDuration}
        />

        <NotesInput
          placeholder="Notes (optional)"
          value={notes}
          onChange={setNotes}
        />
        
        <Button title="Save Walk" onPress={handleSubmit} />
        
        {animatedDogs.map( animated => 
          <SkiddingDog key={animated.id} leftToRight={animated.leftToRight} dog={animated.dog} onFinish={() => handleDogFinish(animated.id)} />
        )}

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    gap: 10,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});