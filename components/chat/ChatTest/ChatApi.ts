import fetcher from '../../../lib/fetcher';

export type Message = {
  author: string;
  content: string;
};

const chatAPI = {
  getMessages: (groupId: any) => {
    console.log('Calling get messages from API');
    return fetcher(`http://localhost:8080/api/v2/messages/${groupId}`);
  },

  sendMessages: (username: string, text: string) => {
    let msg: Message = {
      author: username,
      content: text,
    };
    return fetch('http:localhost:8080/api/v2/kafka/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msg),
    });
  },
};

export default chatAPI;
