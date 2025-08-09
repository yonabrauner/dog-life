import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { selectAllWalks } from "../features/walks/walksSelectors";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { WalkCard } from "./WalkCard.component";
import { Walk } from "../features/walks/walksSlice";
import { subscribeToWalks } from "../api/walks";

interface Props {
    data: Walk[];
}

export function WalkList({ data } : Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    
    // listen and get updated walk list
    useEffect(() => {
          const unsubscribe = subscribeToWalks(dispatch);
          return () => {
            if (typeof unsubscribe === 'function') {
              unsubscribe();
            }
          };
        }, [dispatch]);

    
    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(expandedId => expandedId !== id) : [...prev, id]
        );
    };

    return (
        <FlatList
            scrollEnabled={data.length !== 1}
            data={data}
            style={{width: '100%'}}
            keyExtractor={ item => String(item.id)}
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
    }
});