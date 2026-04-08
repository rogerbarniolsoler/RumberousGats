import { useContext } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LikesContext } from '../../context/LikesContext';
import CatCard from '../../components/CatCard';

export default function LikesScreen() {
  const { likedCats } = useContext(LikesContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gats preferits</Text>
      </View>

      {likedCats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Encara no t'agrada cap gat!</Text>
        </View>
      ) : (
        <FlatList
          data={likedCats}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CatCard item={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce4eb',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  }
});