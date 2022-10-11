import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { styled, Box } from '@mui/material';

const PreviewBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Helvetica Neue, sans-serif',
    fontSize: '14px',
    color: '#ffffff',
    padding: '0px 20px',
    height: '100%',
    width: '100%',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    marginRight: '12px'
}))

const TeamChannelPreview = ({ channel, type, setOpenDrawer }) => {
    const { channel: activeChannel, client, setActiveChannel } = useChatContext();

    const ChannelPreview = () => (
        <PreviewBox>
            <p># {channel?.data?.name || channel?.data?.id} </p>
        </PreviewBox>
    );

    const DirectPreview = () => {
        const member = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
        return (
            <PreviewBox>
                <Avatar
                    image={member[0]?.user?.image}
                    name={member[0]?.user?.fullName}
                    size={24}
                />
                <p>{member[0]?.user?.fullName || member[0]?.user?.name || member[0]?.user?.first_name || member[0]?.user?.id}</p>
            </PreviewBox>
        )
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview_container_selected'
                : 'channel-preview_container'
        }
            onClick={() => {
                setActiveChannel(channel)
                setOpenDrawer(false)
            }}
        >
            {type === "team" ? <ChannelPreview /> : <DirectPreview />}
        </div>
    )
}

export default TeamChannelPreview