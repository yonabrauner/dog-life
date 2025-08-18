import React, { useRef, useEffect, BlockquoteHTMLAttributes } from 'react';
import { Animated, Dimensions, StyleSheet, Image } from 'react-native';
import { Dog } from '../../features/dogs/dogsSlice';

const { width, height } = Dimensions.get('window');

interface Props {
  leftToRight: boolean;
  dog: Dog;
  onFinish?: () => void; // callback when animation ends
}

export function SkiddingDog({ leftToRight, dog, onFinish }: Props) {
    
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const rotate = useRef(new Animated.Value(0)).current;        // For a slight spin
    const opacity = useRef(new Animated.Value(1)).current;
    
    
    useEffect(() => {
      const startX = leftToRight? width - 400 : width - 50;
      const startY = -300; // avoid very top/bottom
      const endX = leftToRight? width + 100 : width - 550;
      const endY = startY + (Math.random() * 200 - 100); // drift slightly up or down
      translateX.setValue(startX);
      translateY.setValue(startY);
      rotate.setValue(0);
      opacity.setValue(1);

      Animated.sequence([
      Animated.parallel([
          Animated.timing(translateX, {
          toValue: endX, // Move across screen
          duration: 2000,
          useNativeDriver: true,
          }),
          Animated.timing(translateY, {
          toValue: endY,
          duration: 2000,
          useNativeDriver: true,
          }),
          Animated.timing(rotate, {
          toValue: 1, // Rotate once
          duration: 2000,
          useNativeDriver: true,
          }),
      ]),
      Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
      }),
      ]).start(() => {
        if (onFinish) onFinish();
      });
    }, []);

    const spin = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'], // Two spins while moving
    });

  return (
    <Animated.View
      style={[
        styles.dog,
        {
          transform: [{ translateX }, {translateY}, { rotate: spin }],
          opacity,
        },
      ]}
    >
      {dog.name === "Ari" ?
        <Image source={leftToRight? require('../../assets/Ari-happy.jpeg') : require('../../assets/Ari-cute-confused.jpeg')} style={styles.image} />
        : <Image source={leftToRight? require('../../assets/Cheetah-cool.jpeg') : require('../../assets/Cheetah-sad.jpeg')} style={styles.image} />
      }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dog: {
    position: 'absolute',
    zIndex: 9999, // very high to guarantee it's above
    pointerEvents: 'none', // so it doesn't block clicks
    // bottom: 500, // Where it "skids"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: 9999, // very high to guarantee it's above
    pointerEvents: 'none', // so it doesn't block clicks
  },
});
