import React from 'react';
import { View, ViewProps } from 'react-native';

type ThemedViewProps = ViewProps & {
  className?: string;
};

export const ThemedView: React.FC<ThemedViewProps> = ({ className = '', children, ...rest }) => {
  return (
    <View className={`flex-1 bg-white dark:bg-black ${className}`} {...rest}>
      {children}
    </View>
  );
};
