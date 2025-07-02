import { View } from 'react-native';
import { ThemedText } from './ThemedText';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <View className={styles.getStartedContainer}>
        <ThemedText className={styles.getStartedText}>{title}</ThemedText>
        <View className={styles.codeHighlightContainer + styles.homeScreenFilename}>
          <ThemedText>{path}</ThemedText>
        </View>
        <ThemedText className={styles.getStartedText}>{description}</ThemedText>
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};
