import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ComposerProps, GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { requestAskGemini } from 'services/api/ai-chat';
import { ChatRequestBody } from 'types/AIChatTypes';

export const ChatScreen = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: "Ask me anything about fishing, and I'll do my best to help!",
      createdAt: new Date(),
      user: { _id: 2, name: 'Fish Coach' },
    },
    {
      _id: 2,
      text: "👋 Hey there! I'm Fish Coach. Here to provide expert advice on fishing techniques and fish behavior to help you improve your angling skills. 🎣",
      createdAt: new Date(),
      user: { _id: 2, name: 'Fish Coach' },
    },
  ]);

  const user: User = {
    _id: 1,
    name: 'You',
  };

  const handleSend = useCallback(async (newMessages: IMessage[] = []) => {
    setInput('');
    const loadingMessage: IMessage = {
      //to simulate loading or replying status
      _id: 'loading', // special id
      text: 'Fish Coach is typing...',
      createdAt: new Date(),
      user: { _id: 2, name: 'Fish Coach' },
    };

    const requestBody: ChatRequestBody = {
      contents: [
        {
          parts: [
            {
              text: newMessages[0].text,
            },
          ],
        },
      ],
    };

    // console.log('@@@REQUESTBODY', requestBody.contents[0].parts[0].text);
    try {
      setMessages((prev) => GiftedChat.append(prev, [...newMessages, loadingMessage]));
      const resp = await requestAskGemini(requestBody);
      if (resp) {
        setTimeout(() => {
          const response: IMessage = {
            _id: Math.random().toString(),
            text: resp.candidates[0].content.parts[0].text,
            createdAt: new Date(),
            user: { _id: 2, name: 'Fish Coach' },
          };

          setMessages((prev) => {
            // to remove loading message
            const filtered = prev.filter((msg) => msg._id !== 'loading');
            return GiftedChat.append(filtered, [response]);
          });
        }, 500);
      }
    } catch (e) {
      console.error('API call failed:', e);
    }
  }, []);

  const renderCustomComposer = (props: ComposerProps) => {
    return (
      <View className="flex-row items-center bg-black px-4 py-2">
        <TextInput
          className="h-11 flex-1 rounded-full bg-zinc-800 px-4 text-base text-white"
          placeholder="Ask the coach..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          className="ml-2 h-11 w-11 items-center justify-center rounded-full bg-blue-600"
          onPress={() => {
            const trimmed = input.trim();
            if (trimmed.length > 0) {
              handleSend([{ _id: Date.now(), text: trimmed, createdAt: new Date(), user }]);
            }
          }}>
          <Ionicons
            size={18}
            color={'white'}
            name={'send-sharp'}
            style={{ transform: [{ rotate: '-40deg' }] }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-black">
      {/* HEADER */}
      <View className="flex-row items-center border-b border-zinc-800 px-4 pb-3 pt-14">
        <View className="mr-2 h-8 w-8 rounded-full bg-white" />
        <Text className="text-lg font-semibold text-white">Fish Coach</Text>
      </View>
      {/* CHAT */}
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={user}
        renderAvatar={() => <View className="ml-1 mt-1 h-8 w-8 rounded-full bg-white" />}
        renderUsernameOnMessage={false}
        placeholder="Ask the coach..."
        renderComposer={(props: ComposerProps) => renderCustomComposer(props)}
        alwaysShowSend
        scrollToBottom
      />
    </View>
  );
};
