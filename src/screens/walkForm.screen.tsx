import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Alert, TextInput, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MultiSelect, Dropdown } from "react-native-element-dropdown";
import { addWalk } from "../features/walks/walksSlice";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';


const DOGS = [{ label: 'Ari', value: 'Ari' },
              { label: 'Cheetah', value: 'Cheetah' }];

const WALKERS = [{ label: 'Yonatan', value: 'Yonatan' },
                 { label: 'Oz', value: 'Oz' },
                 { label: 'Avi', value: 'Avi' },
                 { label: 'Oded', value: 'Oded' },
                 { label: 'Mom', value: 'Mom' },
                 { label: 'Dad', value: 'Dad' },];

export function WalkForm() {
  const [walker, setWalker] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const [dogActivities, setDogActivities] = useState<{ dog: string; pee: boolean, poop: boolean; }[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const displayedValue = duration === "" ? "" : duration;
  const dispatch = useDispatch<AppDispatch>();

  const toggleActivity = (dog: string, type: 'pee' | 'poop') => {
    setDogActivities(prev => {
      const updated = [...prev];
      const index = updated.findIndex(d => d.dog === dog);

      if (index >= 0) {
        updated[index][type] = !updated[index][type];
      } else {
        updated.push({ dog, pee: type === 'pee', poop: type === 'poop' });
      }
      return updated;
    });
  };

  const handleDogSelection = (dogs: string[]) => {
    setSelectedDogs(dogs);
    // Keep dogActivities synced (remove ones not selected)
    setDogActivities(prev => prev.filter(a => dogs.includes(a.dog)));
    // Add default entries for new dogs
    dogs.forEach(dog => {
      if (!dogActivities.some(a => a.dog === dog)) {
        setDogActivities(prev => [...prev, { dog, pee: false, poop: false }]);
      }
    });
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

    if (!walker || !selectedDogs.length) {
        Alert.alert('plase enter walker name and select dogs!');
        return;
    }

    console.log("submitting walk - firing dispatch. date: ", dateString);
    await dispatch(addWalk({ walker, dogs: selectedDogs, dogActivities, duration: Number(finalDuration), notes, date: dateString}))
  
    setDuration('');
    setNotes('');
    Alert.prompt("Walk added!")

  }


    return(
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={WALKERS}
          labelField="label"
          valueField="value"
          placeholder="Select walker"
          value={walker}
          onChange={item => setWalker(item.value)} // Update state when selected
        />
        
        {/* <Text style={styles.label}>Select Dogs:</Text> */}
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={DOGS}
          labelField="label"
          valueField="value"
          placeholder="Select dogs"
          value={selectedDogs}
          onChange={handleDogSelection}
          selectedStyle={styles.selectedStyle}
        />

        {selectedDogs.map(dog => {
          const activity = dogActivities.find(a => a.dog === dog);
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


        <View style={styles.dateRow}>
          <Text style={styles.dateText}>
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
            <Ionicons name="calendar" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        {showDatePicker && ( <DateTimePicker
            value={date}
            mode="date" // could also be "time" or "datetime"
            display="default"
            onChange={onDateChange}
          />
        )}
        {showTimePicker && ( <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <TextInput
            style={styles.input}
            placeholder="Duration (minutes) - 15"
            value={displayedValue}
            defaultValue="15"
            onChangeText={setDuration}
            keyboardType="numeric"
        />

        <TextInput
            style={[styles.input, styles.notes]}
            placeholder="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            multiline
        />

        <Button title="Save Walk" onPress={handleSubmit} />
        {/* <Button title="Back to History" onPress={() => navigation.navigate('History')} /> */}

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
  },
  notes: {
    minHeight: 60,
  },
  label: { fontSize: 18, marginBottom: 8 },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 3,
  },
  placeholderStyle: { fontSize: 16, color: '#999' },
  selectedTextStyle: { fontSize: 16 },
  selectedStyle: { borderRadius: 12, backgroundColor: '#add8e6' },
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
  iconButton: {
    padding: 4,
    marginLeft: 80,
  },
  dateText: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});