import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const spots = [
  { name: 'Spot 1', distance: '200 m', score: 2 },
  { name: 'Spot 2', distance: '500 m', score: 6 },
];

export const MapFooter = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <View className="rounded-t-3xl bg-white p-4 shadow-lg">
      <TouchableOpacity
        onPress={toggleVisibility}
        className="flex-row content-center items-center justify-center">
        <Text className="mb-3 mr-3 mt-1 text-center text-xl font-semibold">Spots near you</Text>
        <Ionicons name={visible ? 'arrow-down' : 'arrow-up'} size={20} />
      </TouchableOpacity>

      {visible &&
        spots.map((spot, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between border-b border-gray-200 py-2 last:border-b-0">
            <View>
              <Text className="font-bold text-gray-900">{spot.name}</Text>
              <Text className="text-sm text-gray-500">{spot.distance}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={18} color="#facc15" className="mr-1" />
              <Text className="font-semibold text-gray-800">{spot.score}</Text>
            </View>
          </View>
        ))}
    </View>
  );
};
