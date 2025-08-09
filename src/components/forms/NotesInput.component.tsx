import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";


interface Props {
    placeholder: string;
    value: string
    onChange: (value: string) => void
}

export function NotesInput({ placeholder, value, onChange }: Props) {
    return(
        <TextInput
            style={[styles.input, styles.notes]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            multiline
        />
    )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
  },
  notes: {
    minHeight: 60,
  },
});