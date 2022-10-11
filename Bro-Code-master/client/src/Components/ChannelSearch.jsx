import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { useChatContext } from 'stream-chat-react';
import { BsSearch } from 'react-icons/bs'

import { ResultDropdown } from './'

const ChannelSearch = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    const { client, setActiveChannel } = useChatContext();

    useEffect(() => {
        if (!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
    }, [query])

    const getChannel = async (text) => {
        try {
            const channelResponses = await client.queryChannels({
                type: 'team',
                name: { $autocomplete: text },
                members: { $in: [client.userID] }
            });
            const userResponses = await client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text }
            });
            const [channels, { users }] = await Promise.all([channelResponses, userResponses]);

            if (channels.length) setTeamChannels(channels);
            if (users.length) setDirectChannels(users);

            setLoading(false)

        } catch (error) {
            setQuery('')
        }
    }

    const onSearch = (e) => {
        e.preventDefault();

        setLoading(true);
        setQuery(e.target.value);
        getChannel(e.target.value);
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }

    return (
        <div style={{ paddingTop: '16px', borderTop: "1px solid #00000033", zIndex: '100000' }}>
            <Box sx={{ margin: '4px', bgcolor: '#ffffff33', borderRadius: '5px' }}>
                <TextField
                    id="outlined-start-adornment"
                    color='white'
                    size="small"
                    value={query}
                    onChange={onSearch}
                    placeholder={"Search..."}
                    sx={{
                        '& #outlined-start-adornment': {
                            color: '#ffffff'
                        }
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><BsSearch color='#fff' width="44px" height="44px" /></InputAdornment>,
                    }}
                />
            </Box>
            {query && (
                <ResultDropdown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                />
            )}
        </div>
    )
}

export default ChannelSearch