import { Stack } from 'expo-router';
import { LikesProvider } from '../context/LikesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LikesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="cat-detail" 
            options={{ 
              presentation: 'modal', 
              headerShown: false, 
            }} 
          />
        </Stack>
      </LikesProvider>
    </GestureHandlerRootView>
  );
}