import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#e85d04',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
      tabBarItemStyle: {
      paddingTop: 5,
    },
    }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={30} color={color} />,
          headerShown: false, 
        }}
      />
      
      <Tabs.Screen
        name="likes"
        options={{
          title: 'Likes',
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={30} color={color} />,
          headerShown: false, 

        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />,
          headerShown: false, 

        }}
      />

    </Tabs>
  );
}