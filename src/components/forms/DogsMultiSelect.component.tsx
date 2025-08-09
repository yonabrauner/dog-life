import React from "react";
import { MultiSelect } from "react-native-element-dropdown";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectAllDogs } from "../../features/dogs/dogsSelectors";


interface Props {
    value: string[];
    onChange: (dogs: string[]) => void;
    placeholder: () => string;
    selected: string[]
    // options: { label: string; value: str+ing }[];
}


export function DogsMultiSelect({ value, onChange, placeholder, selected }: Props) {
  const dogs = useSelector(selectAllDogs);
  

  return (
    <MultiSelect
      selectedTextStyle={styles.selectedTextStyle}
      selectedStyle={styles.selectedStyle}
      style={styles.dropdown}
      data={dogs.map(dog => ({ label: dog.name, value: dog.name }))}
      labelField="label"
      valueField="value"
      placeholder={placeholder()}
      value={value}
      onChange={onChange} // calls WalkForm's handleDogSelection
      renderItem={(item) => {
        const isSelected: boolean = selected.includes(item.value);
        const dog = dogs.find(dog => dog.name === item.value);
        return (
          <View style={[styles.item, isSelected && styles.selectedItem]}>
            <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
              {item.label}
            </Text>
          </View>
        ); 
      }}
    />
  );
}

  const styles = StyleSheet.create({
  selectedStyle: { backgroundColor: '#d1f0ff', borderRadius: 12, paddingHorizontal: 8 },
  selectedTextStyle: { fontSize: 16, backgroundColor: 'bbb' },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownContainer: {
    borderRadius: 8,
  },
  item: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  selectedItem: {
    backgroundColor: '#d1f0ff', // Highlight color for selected items
  },
  itemText: {
    color: '#333',
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: '#0077b6', // Blue text for selected items
  },
});
