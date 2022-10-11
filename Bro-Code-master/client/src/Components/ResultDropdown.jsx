import React from 'react';
import { Box, styled, Typography, Avatar } from '@mui/material';
import { useChatContext, Avatar as AvatarImage } from 'stream-chat-react';
import { padding } from '@mui/system';

const ResultDropdownContainer = styled(Box)(() => ({
    position: 'absolute',
    height: 'fit-content',
    width: '300px',
    background: '#fff',
    border: '1px solid #e9e9ea',
    boxSizing: 'border-box',
    borderRadius: '8px',
    zIndex: '10',
    left: '250px',
    top: '50px',
    padding: '10px 0'
}))

const ResultHeader = styled(Typography)(() => ({
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Helvetica Neue, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: '120%',
    marginLeft: '12px',
    color: ' #858688',
    padding: '5px'
}))

const SearchResultFocused = styled(Box)(() => ({
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    background: '#005fff1a'
}))
const SearchResultNFocused = styled(Box)(() => ({
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    "&:hover": {
        background: '#005fff1a',
        cursor: 'pointer'
    }
}))
const ResultTypo = styled(Typography)(() => ({
    width: '100%',
    fontFamily: 'Helvetica Neue, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '120%',
    color: '#2c2c30',
}))

const channelByUser = async ({ client, setActiveChannel, channel, setChannel }) => {

    const filters = {
        type: 'messaging',
        member_count: 2,
        members: { $eq: [client.user.id, client.userID] },
    };

    const [existingChannel] = await client.queryChannels(filters);
    if (existingChannel) return setActiveChannel(existingChannel);

    const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });
    setChannel(newChannel)

    return setActiveChannel(newChannel);
}

const SearchResult = ({ channel, focusedId, type, setChannel }) => {

    const { client, setActiveChannel } = useChatContext();

    if (type === 'channel') {
        return (
            <>
                {focusedId === channel.id ? (
                    <SearchResultFocused onClick={() => { setChannel(channel) }} >
                        <Avatar children="#" sx={{ height: '24px', width: '24px', bgcolor: '#005fff', fontSize: '14px', margin: '5px 8px 5px 20px' }} />
                        <ResultTypo>{channel.data.name}</ResultTypo>
                    </SearchResultFocused>
                ) : (
                    <SearchResultNFocused onClick={() => { setChannel(channel) }} >
                        <Avatar children="#" sx={{ height: '24px', width: '24px', bgcolor: '#005fff', fontSize: '14px', margin: '5px 8px 5px 20px' }} />
                        <ResultTypo>{channel.data.name}</ResultTypo>
                    </SearchResultNFocused>
                )}
            </>
        )
    }
    return (
        <>
            {focusedId === channel.id ? (
                <SearchResultFocused
                    onClick={async () => {
                        channelByUser({ client, setActiveChannel, channel, setChannel })
                    }} >
                    <Box display='flex' alignContent='center' margin='5px 8px 5px 20px' >
                        <AvatarImage image={channel.image || undefined} name={channel.name} size={24} />
                        <ResultTypo>{channel.name}</ResultTypo>
                    </Box>
                </SearchResultFocused>
            ) : (
                <SearchResultNFocused onClick={async () => {
                    channelByUser({ client, setActiveChannel, channel, setChannel })
                }} >
                    <Box display='flex' alignItems='center' margin='5px 0 5px 20px' >
                        <AvatarImage image={channel.image || undefined} name={channel.name} size={24} />
                        <ResultTypo>{channel.name}</ResultTypo>
                    </Box>
                </SearchResultNFocused>
            )}
        </>
    )
}

const ResultDropdown = ({ teamChannels, directChannels, focusedId, loading, setChannel }) => {
    console.log(directChannels.length);
    return (
        <ResultDropdownContainer>
            <ResultHeader>Channels</ResultHeader>
            {loading && !teamChannels.length && (
                <ResultHeader>
                    <i style={{ fontWeight: 'normal', marginLeft: '12px' }}>Loading...</i>
                </ResultHeader>
            )}
            {!loading && !teamChannels.length ?
                (<ResultHeader> No Channels Found </ResultHeader>
                ) : (
                    teamChannels?.map((channel, i) => (
                        <SearchResult
                            channel={channel}
                            focusedId={focusedId}
                            key={i}
                            setChannel={setChannel}
                            type='channel'
                        />
                    ))
                )
            }
            <ResultHeader marginTop='10px'>Users</ResultHeader>
            {loading && !directChannels.length && (
                <ResultHeader>
                    <i style={{ fontWeight: 'normal', marginLeft: '12px' }}>Loading...</i>
                </ResultHeader>
            )}
            {!loading && !directChannels.length ? (
                <ResultHeader> No direct messages found </ResultHeader>
            ) : (
                directChannels?.map((channel, i) => (
                    <SearchResult
                        channel={channel}
                        focusedId={focusedId}
                        key={i}
                        setChannel={setChannel}
                        type='user'
                    />
                ))
            )
            }
        </ResultDropdownContainer>
    )
}

export default ResultDropdown