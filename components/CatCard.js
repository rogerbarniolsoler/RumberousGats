import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LikesContext } from '../context/LikesContext';
import { useRouter } from 'expo-router';
import Animated, { 
  runOnJS, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  withRepeat,
  cancelAnimation
} from 'react-native-reanimated'; 
import { Audio } from 'expo-av';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function CatCard({ item }) {
  const { toggleLike, isLiked } = useContext(LikesContext);
  const liked = isLiked(item.id);
  const router = useRouter();


  //PEL SO
  const [sound, setSound] = useState();

  const scale = useSharedValue(1);

  useEffect(() => {
    async function loadSound() {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../assets/sounds/gat_rumbero.mp3'),
          { isLooping: true, volume: 1.0 }
        );
        setSound(newSound);
      } catch (error) {
        console.log("Error carregant el so:", error);
      }
    }
    loadSound();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const playRumba = async () => {
    if (sound) {
      await sound.replayAsync(); 
    }
  };

  const stopRumba = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const longPressGesture = Gesture.LongPress()
    .minDuration(250)
    .onStart(() => {
      scale.value = withSpring(0.95, { damping: 10, stiffness: 100 });

      scale.value = withTiming(
        0.96,
        { duration: 250 }, 
        () => {
          scale.value = withRepeat(
            withTiming(0.94, { duration: 250 }),
            -1, true 
          );
        }
      );
      
      if (sound) {
        runOnJS(playRumba)();
      }
    })
    .onFinalize(() => {
      cancelAnimation(scale);
      scale.value = withSpring(1);

      if (sound) {
        runOnJS(stopRumba)();
      }
    });

  const handlePress = () => {
    router.push({ pathname: '/cat-detail', params: item });
  };

  return (
    <GestureDetector gesture={longPressGesture}>
      <Animated.View style={[styles.card, animatedCardStyle]}>
        <Pressable onPress={handlePress} style={styles.cardContent}>
          <Animated.Image 
            sharedTransitionTag={`image-${item.id}`} 
            source={{ uri: item.imageUrl }} 
            style={styles.catImage} 
          />
          
          <View style={styles.cardHeaderRow}>
            <Text style={styles.catName}>{item.name}</Text>
            <Pressable onPress={() => toggleLike(item)} style={styles.likeButton}>
              <Ionicons 
                name={liked ? "heart" : "heart-outline"} 
                size={24} 
                color={liked ? "#e85d04" : "#333"} 
              />
            </Pressable>
          </View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: 'white', 
    marginVertical: 10, 
    marginHorizontal: 20, 
    borderRadius: 10, 
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  catImage: { 
    width: '100%', 
    height: 200 
  },
  cardHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', padding: 10 
  },
  catName: { 
    fontSize: 16, 
    fontWeight: '600', 
    flex: 1 
  },
  likeButton: { 
    padding: 5, 
    zIndex: 10 
  },
});