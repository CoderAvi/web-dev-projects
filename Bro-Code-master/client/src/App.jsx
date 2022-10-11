import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie';

import './App.css';
import 'stream-chat-react/dist/css/index.css'
import { Auth, ChannelContainer, ChannelListContainer } from './Components'

const cookies = new Cookies();

const apiKey = process.env.STREAM_API_KEY
const chatClient = StreamChat.getInstance(apiKey);
const authToken = cookies.get('token');

if (authToken) {
  chatClient.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#bf80ff',
      main: '#8619FF',
      dark: '#5D23A4',
      darker: '#2F0662'
    },
    white: {
      main: '#ffffff'
    }
  },
});

const App = () => {

  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  if (!authToken) return (
    <ThemeProvider theme={theme}>
      <Auth />
    </ThemeProvider>
  )

  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <Chat client={chatClient}>
          <Grid container height='100%'>
            <Grid item xs={0} md='auto' height='100%'>
              <ChannelListContainer
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            </Grid>
            <Grid item xs={12} md height='100%'>
              <ChannelContainer
                setIsCreating={setIsCreating}
                isCreating={isCreating}
                createType={createType}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            </Grid>
          </Grid>
        </Chat>
      </ThemeProvider>
    </div>
  );
}

export default App;