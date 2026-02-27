import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCats = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=50&has_breeds=1', {
        headers: {
          'x-api-key': process.env.EXPO_PUBLIC_CAT_API_KEY,
        }
      });
      
      const data = await response.json();
      setCats(data);
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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image 
                source={{ uri: item.url }} 
                style={styles.catImage} 
              />
              <Text style={styles.catName}>
                {item.breeds && item.breeds.length > 0 ? item.breeds[0].name : "Gat misteriós"}
              </Text>
            </View>
          )}
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
    //backgroundColor: 'white',
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
    margin: 10,
    borderRadius: 10,
  },
  catImage: {
    width: '100%',
    height: 200,
  },
  catName: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center',
  }
});