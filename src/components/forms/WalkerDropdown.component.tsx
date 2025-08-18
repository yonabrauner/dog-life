import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import PersonSvg from '../../assets/person.svg';
import { MyTheme } from "../../constants/Theme";
import { FORMBUTTONSIZE, WALKERS } from "../../constants/FormConstants";
import { isFulfilled } from "@reduxjs/toolkit";


interface Props {
    value: string;
    onChange: (val: string) => void
}

export function WalkerDropdown({ value, onChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (name: string) => {
    onChange(name);
    setModalVisible(false);
  };

  return (<>
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={[styles.button, value ? null : styles.unfulfilled ]}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <PersonSvg width={FORMBUTTONSIZE * 0.9} height={FORMBUTTONSIZE * 0.9} />
      </View>
    </TouchableOpacity>

    <Text style={styles.selectedText}>{value}</Text>

    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>select walker</Text>
                <FlatList
                  data={WALKERS}
                  keyExtractor={(item) => item.label}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.item, value==item.label ? styles.selected : null]} onPress={() => handleSelect(item.value)}>
                      <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
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
  modalContent: {
    backgroundColor: MyTheme.colors.surface,
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    minWidth: 200,
    maxHeight: 360,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: MyTheme.colors.text,
    fontFamily: "Quicksand_700Bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    width: 200,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    paddingBottom: 4,
    marginVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  selected: {
    borderStyle: 'dashed',
    borderColor: MyTheme.colors.primary,
    borderWidth: 2
  },
  itemText: {
    fontSize: 26,
    fontFamily: "Quicksand_400Regular",
    textAlign: 'center',
  },
  selectedText: {
    fontFamily: "Quicksand_400Regular",
     textAlign: 'center',
      width: FORMBUTTONSIZE,
  },
  closeLabel: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 3,
    color: MyTheme.colors.textSecondary,
  },
});