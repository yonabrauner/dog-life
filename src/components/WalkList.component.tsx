import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenToWalks } from "../features/walks/walksSlice";
import { AppDispatch } from "../store/store";
import { selectAllWalks } from "../features/walks/walksSelectors";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { WalkCard } from "./WalkCard.component";

export function WalkList() {
    const walks = useSelector(selectAllWalks);
    const dispatch = useDispatch<AppDispatch>();
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    
    // listen and get updated walk list
    useEffect(() => {
        const unsubscribe = dispatch(listenToWalks());
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [dispatch]);

    
    const toggleExpand = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(expandedId => expandedId !== id) : [...prev, id]
        );
    };

    return (
        <FlatList
            data={walks}
            keyExtractor={ item => item.id}
            renderItem={({ item }) => (
                <WalkCard
                walk={item}
                expanded={expandedIds.includes(item.id)}
                onToggle={() => toggleExpand(item.id)}
                />
            )}
            contentContainerStyle={styles.list}
        />
      );

}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  }});