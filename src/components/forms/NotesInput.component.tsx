import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { FORMBUTTONSIZE } from "../../constants/FormConstants";
import NotesSvg from '../../assets/notes.svg';
import { MyTheme } from "../../constants/Theme";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function NotesInput({ value, onChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (<>
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={[styles.button, value ? styles.backgroundIcon : null]}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <NotesSvg width={FORMBUTTONSIZE * 0.8} height={FORMBUTTONSIZE * 0.8} opacity={ value ? 0.1 : 1} style={{position: 'absolute'}}/>
        {value ? <Text style={styles.valueText} >{value}</Text> : null}
      </View>
    </TouchableOpacity>

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
                <Text style={styles.modalTitle}>Have notes? (optional)</Text>
                <TextInput
                  style={styles.input}
                  multiline
                  numberOfLines={4}
                  maxLength={60}
                  placeholder="Tap here to add notes"
                  value={value}
                  placeholderTextColor={MyTheme.colors.textSecondary}
                  onChangeText={onChange}
                  textAlignVertical="top"
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
    backgroundIcon: {
      backgroundColor: MyTheme.colors.background,
      borderWidth: 8,
      borderColor: '#FFB84D',
    },
    fulfilled: {
      borderWidth: 5,
      borderColor: '#4ef154ff',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    valueText: {
      textAlign: 'left',
      paddingHorizontal: 13,
      textAlignVertical: 'top',
      fontFamily: "Quicksand_600SemiBold",
      // justifyContent: 'center',

    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: MyTheme.colors.surface,
      alignItems: 'center',
      verticalAlign: 'middle',
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 12,
      minWidth: 200,
      maxWidth: '70%',
      maxHeight: 360,
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 10,
      color: MyTheme.colors.text,
      fontFamily: "Quicksand_700Bold",
    },
    input: {
      minHeight: 100, // default space for multiple lines
      borderRadius: 12,
      padding: 12,
      fontSize: 16,
      color: MyTheme.colors.text,
      backgroundColor: '#f1f1f1',
      minWidth: '50%',
      maxWidth: '80%',
      fontFamily: "Quicksand_400Regular",

    },
    closeLabel: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: -10,
    color: MyTheme.colors.textSecondary,
  },
});