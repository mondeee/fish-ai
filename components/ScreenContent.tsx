import { View } from 'react-native';
import { EditScreenInfo } from './EditScreenInfo';
import { ThemedText } from './ThemedText';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <ThemedText className={styles.title}>{title}</ThemedText>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-10 w-4/5 bg-gray-400`,
  title: `text-xl font-bold`,
};
