import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const CatCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.catImage} 
      />
      
      <View style={styles.cardHeaderRow}>
        <Text style={styles.catName}>{item.name}</Text>
        
        <Pressable 
          onPress={() => setExpanded(!expanded)} 
          style={ styles.expandButton }
        >
          <Text style={styles.expandIcon}>{expanded ? '✕' : '▼'}</Text>
        </Pressable>
      </View>

      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.statText}>Intel·ligència: {item.intelligence}/5</Text>
          <Text style={styles.statText}>Afecte: {item.affectionLevel}/5</Text>
          <Text style={styles.statText}>Dog Friendly: {item.dogFriendly}/5</Text>
        </View>
      )}
    </View>
  );
};

export default function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCats = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=30&has_breeds=1', {
        headers: {
          'x-api-key': process.env.EXPO_PUBLIC_CAT_API_KEY,
        }
      });
      
      const data = await response.json();
      
      const formattedCats = data.map(cat => {
        const breedInfo = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : {};
        return {
          id: cat.id,
          imageUrl: cat.url,
          name: breedInfo.name || "Gat misteriós",
          intelligence: breedInfo.intelligence || 0,
          affectionLevel: breedInfo.affection_level || 0,
          dogFriendly: breedInfo.dog_friendly || 0
        };
      });

      setCats(formattedCats);
      setLoading(false);
    } catch (error) {
      console.error("Error descarregant els gats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Buscant gats rumberos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rumberous Cats</Text>
        </View>
        
        <FlatList
          data={cats}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CatCard item={item} />}
        />

        <Pressable 
          style={({ pressed }) => [
            styles.fab,
            pressed && styles.fabPressed
          ]} 
          onPress={fetchCats}
        >
          <Text style={styles.reload}>Reload</Text>
        </Pressable>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce4eb',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#afafaf',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  catImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  catName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  expandButton: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: 35,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#e0e0e0',
  },
  expandIcon: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  expandedContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  statText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#444',
  },
  fab: {
    position: 'absolute',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 20,
    backgroundColor: '#2e2e2e',
    borderRadius: 15,
  },
  fabPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  reload: {
    fontSize: 20,
    color: 'white',
  }
});