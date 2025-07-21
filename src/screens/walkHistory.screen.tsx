import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalkList } from '../components/WalkList.component';


export function WalkHistory() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']}>
      <WalkList />
    </SafeAreaView>
  );
}
