import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// IMPORTEM EL COMPONENT QUE HEM CREADO A FORA!
import CatCard from '../../components/CatCard'; 

export default function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCats = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1', {
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
});