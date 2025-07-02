import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ChatScreen } from 'app/Chat';
import { MapScreen } from 'app/Map';
import { useColorScheme } from 'react-native';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: scheme === 'dark' ? '#fff' : '#000',
          tabBarInactiveTintColor: scheme === 'dark' ? '#888' : '#999',
          tabBarStyle: {
            paddingTop: '12',
            backgroundColor: scheme === 'dark' ? '#1a1a1a' : '#fff',
            borderTopColor: scheme === 'dark' ? '#333' : '#ddd',
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === 'Map' ? 'map' : 'chatbubble';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
