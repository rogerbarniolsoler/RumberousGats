import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';

export default function CatDetail() {
  const { id, name, imageUrl, intelligence, affectionLevel, dogFriendly } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.Image 
          sharedTransitionTag={`image-${id}`} 
          source={{ uri: imageUrl }} 
          style={styles.image} 
        />
        
        <View style={styles.infoCard}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.divider} />
          
          <Text style={styles.stat}>Intel·ligència: {intelligence}/5</Text>
          <Text style={styles.stat}>Nivell d'afecte: {affectionLevel}/5</Text>
          <Text style={styles.stat}>Amic dels gossos: {dogFriendly}/5</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  handleContainer: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    zIndex: 10, 
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2.5,
  },
  image: { 
    width: '100%', 
    height: 450 
  },
  infoCard: {
    backgroundColor: 'white',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    padding: 30,
    minHeight: 500,
  },
  name: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10 
  },
  divider: { 
    height: 3, 
    backgroundColor: '#e85d04', 
    width: 40, 
    borderRadius: 2,
    marginBottom: 25 
  },
  stat: { 
    fontSize: 18, 
    marginBottom: 20,
    color: '#555' 
  }
});