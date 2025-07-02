import 'dotenv/config';

export default {
  expo: {
    name: 'FishAI',
    slug: 'fish-ai-app',
    extra: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      eas: {
        projectId: '5fa98dfd-5a01-425a-9f15-dbfd4e816307',
      },
    },
    updates: {
      url: 'https://u.expo.dev/5fa98dfd-5a01-425a-9f15-dbfd4e816307',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
  },
};
