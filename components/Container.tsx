import React from 'react';
import { SafeAreaView, ViewProps } from 'react-native';

type ContainerProps = ViewProps & {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({ children, className = '', ...rest }) => {
  return (
    <SafeAreaView className={`m-6 flex-1 bg-white dark:bg-black ${className}`} {...rest}>
      {children}
    </SafeAreaView>
  );
};
