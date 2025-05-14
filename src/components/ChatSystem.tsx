import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

interface ChatMessage {
  id: string;
  player: string;
  message: string;
  timestamp: number;
}

const ChatSystem: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      player: 'Player1', // Replace with actual player name
      message: inputMessage.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        Global Chat
      </Typography>

      <Box
        ref={chatBoxRef}
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: 'background.default',
        }}
      >
        <List>
          {messages.map(msg => (
            <ListItem key={msg.id} sx={{ py: 0.5 }}>
              <ListItemText
                primary={
                  <Box component="span" sx={{ display: 'flex', gap: 1 }}>
                    <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      fontWeight="bold"
                    >
                      {msg.player}
                    </Typography>
                    <Typography component="span" variant="body2">
                      {msg.message}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          sx={{ backgroundColor: 'background.default' }}
        />
      </Box>
    </Paper>
  );
};

export default ChatSystem;