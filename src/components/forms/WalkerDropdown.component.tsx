import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { View } from "react-native";

interface Props {
    value: string;
    onChange: (val: string) => void
}

const WALKERS = [{ label: 'Yonatan', value: 'Yonatan' },
                 { label: 'Oz', value: 'Oz' },
                 { label: 'Avi', value: 'Avi' },
                 { label: 'Oded', value: 'Oded' },
                 { label: 'Mom', value: 'Mom' },
                 { label: 'Dad', value: 'Dad' },];


export function WalkerDropdown({ value, onChange }: Props) {
    return (
    <View style={{ marginVertical: 10 }}>
      <Dropdown
        data={WALKERS}
        labelField="label"
        valueField="value"
        placeholder="Select walker"
        value={value}
        onChange={(item) => onChange(item.value)}
        style={{ borderWidth: 1, borderRadius: 8, padding: 8, height: 50 }}
      />
    </View>
  );
}