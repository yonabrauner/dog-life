import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";


export function WalkCardCalendar({ fullDate, expanded } : {fullDate: string, expanded: boolean}) {
    function TinyDay({ date, state, marking, onPress }: {
        date: DateData,
        state: 'disabled' | 'today' | 'day',
        marking?: any,
        onPress?: () => void,
        }) {
        const isSelected = marking?.selected;

        return (
            <TouchableOpacity onPress={onPress} style={styles.dayContainer} disabled>
            <View
                style={[
                styles.dot,
                isSelected ? styles.selectedDot : null,
                state === 'disabled' ? styles.disabledDot : null,
                ]}
            />
            </TouchableOpacity>
        );
    }

    return(
        <Calendar
            current={fullDate}
            markedDates={{
                [fullDate]: { selected: true, selectedColor: '#4CAF50' },
            }}
            hideArrows={true}
            initialDate={fullDate}
            hideExtraDays={true}
            showWeekNumbers={false}
            hideDayNames={true}
            disabledByDefault={true}
            disableMonthChange={true}
            disableAllTouchEventsForDisabledDays={true}
            renderHeader={() => null}
            dayComponent={({date, state}) => {
                // console.log("selected day:", fullDate);
                return (
                    <View
                    style={{
                        width: 4,
                        height: 4,
                        borderRadius: 5,        // half of width/height
                        backgroundColor: fullDate.endsWith((date!.day).toString()) ? '#4CAF50' : 'gray',
                        // margin: -7,
                        marginVertical: -25,
                        marginTop: -7,
                    }}
                    />
                )
            }}
            style={expanded ? styles.calendarExpanded : styles.calendarCollapsed}
            theme={{
                textDayFontSize: 1, // you can leave this small but > 0 to avoid errors
                calendarBackground: '#e6ccb2',
            }}
        />
    )
}

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  selectedDot: {
    backgroundColor: '#4CAF50',
  },
  disabledDot: {
    backgroundColor: '#eee',
  },
  calendarCollapsed: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  calendarExpanded: {
    // paddingTop: 20,
    width: 120,
    height: 100,
    borderRadius: 10,
  },
});