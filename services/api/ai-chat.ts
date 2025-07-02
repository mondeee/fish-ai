import { ChatRequestBody, ChatResponse } from 'types/AIChatTypes';
import { API_URLS } from './apiUrls';
import { postRequest } from './requests';

export const requestAskGemini = async (request_body: ChatRequestBody): Promise<ChatResponse> => {
  try {
    const response = await postRequest<ChatResponse>(API_URLS.ASK_GEMINI, request_body, {
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': process.env.GEMINI_API_KEY,
      },
    });
    // console.log('@@@RAW RESPONSE', response);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};
