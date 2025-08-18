import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FORMBUTTONSIZE } from '../../constants/FormConstants';
import CalendarSvg from '../../assets/calendar-clock.svg';


interface Props {
  date: Date;
  onChange: (date: React.SetStateAction<Date>) => void;
}

export function DateTimePickerField({ date, onChange }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
  
      if (event.type === 'dismissed') {
        setShowDatePicker(false); // Close on cancel
        return;
      }
      if (selectedDate) {
        onChange(prev => new Date(selectedDate.setHours(prev.getHours(), prev.getMinutes())));
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
        onChange(prev => {
          const newDate = new Date(prev);
          newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
          return newDate;
        });
      }
      setShowTimePicker(false);
    };

  return (<>

    <TouchableOpacity
      style={[styles.button, date ? null : styles.unfulfilled]}
      onPress={() => setShowDatePicker(true)}
    >
      <View style={styles.iconContainer}>
        <CalendarSvg width={FORMBUTTONSIZE * 0.9} height={FORMBUTTONSIZE * 0.9} />
      </View> 
    </TouchableOpacity>
    <Text style={styles.selectedText}>
      {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </Text>

    {showDatePicker && (
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onDateChange}
      />
    )}

    {showTimePicker && (
      <DateTimePicker
        value={date}
        mode="time"
        display="default"
        onChange={onTimeChange}
      />
    )}
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
  selectedText: {
    fontFamily: "Quicksand_400Regular",
    textAlign: 'center',
    width: FORMBUTTONSIZE,
    marginTop: 2,
  },
});