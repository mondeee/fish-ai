import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';

export const MapHeader = () => {
  return (
    <View className="align-center w-full flex-row justify-center">
      <View className="w-10/12 flex-row items-center rounded-full bg-white px-4 py-2">
        <Ionicons name="location-outline" size={24} color="black" />
        <TextInput
          className="text-md ml-2 flex-1 text-black"
          placeholder="Charles Darwin National Park"
          placeholderTextColor="#6b7280"
        />
      </View>
      <TouchableOpacity className="ml-2 justify-center rounded-full bg-white p-3">
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
