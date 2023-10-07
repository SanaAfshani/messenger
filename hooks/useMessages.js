//Test
import { useState, useEffect } from "react";
import { faker } from '@faker-js/faker';
import useOnScreen             from './useOnScreen'

const getMessages = () => {
  const data = [];
  for (let x = 0; x < 20; x++) {
    data.push({
      id: faker.datatype.uuid(),
      message: faker.lorem.words(Math.floor(Math.random() * 10) + 1),
      in: faker.datatype.boolean()
    });
  }

  return data;
};

const useMessages = () => {
  const [messages, setMessages] = useState(getMessages());
  const [lastMessageRef, setLastMessageRef] = useState(null);
  const isIntersecting = useOnScreen({ current: lastMessageRef });

  useEffect(() => {
    if (isIntersecting) {
      setMessages((old) => getMessages().concat(old));
    }
  }, [isIntersecting]);

  return {
    messages,
    setMessages,

    setLastMessageRef
  };
};

export default useMessages;
