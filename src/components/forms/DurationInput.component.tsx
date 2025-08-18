import React, { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import StopwatchSvg from '../../assets/stopwatch.svg';
import { FORMBUTTONSIZE } from "../../constants/FormConstants";
import { MyTheme } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";


type Props = {
  value?: number; // duration in minutes
  onChange: (minutes: number) => void;
};

export function DurationInput({value=15, onChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  // const [value, setValue] = useState(15);

  const updateValue = (newValue: number) => {
    const positiveValue = Math.max(0, newValue); // ensure positive only
    onChange(positiveValue);
  };

  const handleTextChange = (text: string) => {
    const num = parseInt(text);
    if (!isNaN(num)) updateValue(num);
  };

  return (
    <>
      {/* Button */}
      <TouchableOpacity
        style={[styles.button, value ? null : styles.unfulfilled]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.iconContainer}>
          <StopwatchSvg width={FORMBUTTONSIZE * 0.9} height={FORMBUTTONSIZE * 0.9} />
        </View>
      </TouchableOpacity>

      <Text style={styles.selectedText}>
        {value ? `${value} min` : "Duration"}
      </Text>

      {/* Modal with picker */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => {setModalVisible(false); onChange(value)}}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Duration</Text>
                <View style={styles.inputRow}>
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => updateValue(value - 5)}
                  >
                    <Ionicons
                      name="play-back"
                      size={24}
                      color={MyTheme.colors.text}
                    />
                  </TouchableOpacity>

                  {/* Decrease by 1 */}
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => updateValue(value - 1)}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={24}
                      color={MyTheme.colors.text}
                    />
                  </TouchableOpacity>

                  {/* Input */}
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={value.toString()}
                    onChangeText={handleTextChange}
                  />

                  {/* Increase by 1 */}
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => updateValue(value + 1)}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={MyTheme.colors.text}
                    />
                  </TouchableOpacity>

                  {/* Increase by 5 */}
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => updateValue(value + 5)}
                  >
                    <Ionicons
                      name="play-forward"
                      size={24}
                      color={MyTheme.colors.text}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>tap the number to edit manually</Text>
                <Text style={styles.closeLabel}>tap outside to close</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
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
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: MyTheme.colors.surface,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    minWidth: 200,
    height: 300,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  input: {
    marginHorizontal: 4,
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#F3F3F3',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Quicksand_400Regular',
    color: MyTheme.colors.text,
  },
  updateButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: MyTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: MyTheme.colors.text,
    fontFamily: "Quicksand_700Bold",
  },
  label: {
    color: MyTheme.colors.text,
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16,
    textAlign: 'center',
    width: 120,
    marginHorizontal: 5,
  },
  closeLabel: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: -10,
    marginRight: 5,
    color: MyTheme.colors.textSecondary,
  },
});