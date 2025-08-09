import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';


interface Props {
  date: Date;
  showDatePicker: boolean;
  showTimePicker: boolean;
  setShowDatePicker: (value: boolean) => void;
  setShowTimePicker: (value: boolean) => void;
  onDateChange: (event: any, selectedDate?: Date) => void;
  onTimeChange: (event: any, selectedDate?: Date) => void;
}

export function DateTimePickerField({ date, showDatePicker, showTimePicker, setShowDatePicker, setShowTimePicker, onDateChange, onTimeChange }: Props) {
  return (
    <View style={styles.dateRow}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconButton}>
        <Text style={styles.dateText}>
          {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Ionicons name="calendar" size={36} color="#333" />
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  dateRow: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    marginRight: 10,
  },
  iconButton: {
    // padding: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});