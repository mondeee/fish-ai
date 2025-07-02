import React, { useMemo } from 'react';
import { Text, TextProps } from 'react-native';

type ThemedTextProps = TextProps & {
  className?: string;
};

export const ThemedText: React.FC<ThemedTextProps> = ({ className = '', children, ...props }) => {
  const combinedClass = useMemo(() => {
    return `text-black dark:text-white ${className}`.trim();
  }, [className]);

  return (
    <Text className={combinedClass} {...props}>
      {children}
    </Text>
  );
};
