import React, { useState } from 'react'
import { Box, Typography, styled, TextField } from '@mui/material';
import { useChatContext } from 'stream-chat-react';
import { AiFillCloseCircle } from 'react-icons/ai'

import { UserList } from './'

const ChannelNameInputContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
}))

const HeaderBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '62px',
  boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
  padding: '10px 30px',
  fontSize: '1.1rem'
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  height: 600,
  width: { xs: '85%', sm: '65%', md: 500 },
};

const buttonStyle = {
  height: '82px',
  background: '#f7f6f8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  borderBottomRightRadius: '20px',
  borderBottomLeftRadius: '20px',
  padding: '8px 15px',
  fontSize: '1.1rem'
}

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (e) => {
    setChannelName(e.target.value);
  }

  return (
    <ChannelNameInputContainer>
      <TextField
        id="outlined-basic"
        label="Channel-name"
        variant="outlined"
        placeholder='channel-name'
        value={channelName}
        onChange={handleChange}
      />
    </ChannelNameInputContainer>
  )
}

const EditChannel = ({ setIsEditing, setOpenDrawer }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}` })
    }
    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
    setOpenDrawer(false);
  }

  const closeHandler = () => {
    setIsEditing(false);
    setOpenDrawer(false);
  }

  return (
    <Box sx={style}>
      <Box display='flex' flexDirection='column' height='100%'>
        <HeaderBox>
          <Typography>Edit Channel</Typography>
          <AiFillCloseCircle onClick={closeHandler} style={{ cursor: 'pointer', height: '25px', width: '25px', color: '#5D23A4' }} />
        </HeaderBox>
        <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
        <UserList setSelectedUsers={setSelectedUsers} />
        <div style={buttonStyle} onClick={updateChannel}>
          <Typography variant="button" sx={{ cursor: 'pointer' }} >Save Changes</Typography>
        </div>
      </Box>
    </Box>
  )
}

export default EditChannel