import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const CustomMarker = ({ marker, index }: { marker: any; index: number }) => {
  const isFocused = marker.onFocus;

  /*
    Why this?
    android custom google markers are a bit broken need to adjust manually by platform.
    known bug https://github.com/tomekvenits/react-native-map-clustering/issues/279
  */
  // if (Platform.OS === 'android') {
  //   return (
  //     <View className="flex-row items-center" style={{ minHeight: 40, minWidth: 120 }}>
  //       <View
  //         className={`flex-row items-center rounded-2xl p-2 ${
  //           isFocused ? 'bg-yellow-300' : 'bg-white'
  //         }`}>
  //         <Ionicons name="fish" size={isFocused ? 44 : 24} color="black" />
  //         <Text className={`ml-2 font-bold text-black ${isFocused ? 'text-xl' : 'text-base'}`}>
  //           {index + 2}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View className="flex-row items-center">
      <View
        className={`flex-row items-center rounded-2xl p-2 ${
          isFocused ? 'bg-yellow-300' : 'bg-white'
        }`}>
        <Ionicons name="fish" size={isFocused ? 44 : 24} color="black" />
        <Text className={`ml-2 font-bold text-black ${isFocused ? 'text-3xl' : 'text-xl'}`}>
          {index + 2}
        </Text>
      </View>
    </View>
  );
};
