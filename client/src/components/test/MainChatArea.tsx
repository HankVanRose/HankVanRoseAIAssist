import {
  Box,
  Typography,
  Avatar,
  ListItemText,
  ListItem,
  Button,
} from '@mui/material';

import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { chatStore } from '../../stores/ChatStore';
import { MessageInput } from '../MessageInput';
import { Add } from '@mui/icons-material';
import ava from '../../assets/ava.jpg';
import Spinner from '../UI/Spinner/Spinner';
import ParticlesBg from 'particles-bg';
export const MainChatArea = observer(() => {
  const currentChat = chatStore?.currentChat;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  if (!currentChat) {
    return (
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <ParticlesBg color="#000000" type="cobweb" num={50} bg={true} />
        <Spinner />
        <Typography variant="h6" color="text.secondary">
          Выберите чат или создайте новый
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => chatStore.createChat()}
          sx={{ mr: 1, mt: 2, background: '#ff1d5e' }}
        >
          Новый чат
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',

        transition: 'margin-left 0.5s ease',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {chatStore.currentChat?.messages.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <Spinner />
            <Typography variant="h5" gutterBottom>
              Как я могу вам помочь сегодня?
            </Typography>
            <Typography color="text.secondary">
              Задайте мне любой вопрос или начните новый чат
            </Typography>
          </Box>
        )}

        {currentChat?.messages.map((message) => (
          <ListItem key={message.id} alignItems="flex-start">
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
              }}
            >
              <Avatar
                src={message.role === 'user' ? ava : 'U'}
                sx={{
                  ml: message.role === 'user' ? 2 : 0,
                  mr: message.role === 'user' ? 0 : 2,
                }}
              >
                {message.role === 'user' ? 'U' : 'AI'}
              </Avatar>
              <Box
                sx={{
                  maxWidth: '70%',
                  p: 2,
                  borderRadius: 4,
                  bgcolor: message.role === 'user' ? '#ff1d5db8' : '#b0b3bf',
                  color: message.role === 'user' ? 'white' : 'text.secondary',
                }}
              >
                <ListItemText
                  primary={message.content}
                  sx={{ wordBreak: 'break-word' }}
                />
              </Box>
            </Box>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 64,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => chatStore.createChat()}
          sx={{ mr: 1, background: '#ff1d5e' }}
        >
          Новый чат
        </Button>
      </Box>
      <MessageInput />
    </Box>
  );
});
