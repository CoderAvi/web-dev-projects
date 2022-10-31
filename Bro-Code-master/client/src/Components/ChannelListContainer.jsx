import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { List, ListItem, ListItemAvatar, Avatar, Drawer, IconButton, Box, styled } from '@mui/material';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { FaLaptopCode } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineMenuFold } from 'react-icons/ai'

const cookies = new Cookies();

const headerText = {
    fontFamily: 'Helvetica Neue, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '28px',
    color: '#ffffff',
}

const headerStyle = {
    paddingLeft: '16px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

const drawerStyle = {
    display: { xs: 'flex', md: 'none' },
    height: '100%',
    boxShadow: 'inset 1px 0px 0px rgba(0, 0, 0, 0.1)',
    top: '0%',
    zIndex: '5',
    transition: '0.8s ease'
}

const Sidebar = ({ logout }) => (
    <List sx={{ width: '72px', bgcolor: 'primary.dark', height: '100vh', padding: '0' }} >
        <ListItem sx={{ paddingTop: '12px' }}>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44, color: 'white.main', cursor: 'pointer' }}>
                    <FaLaptopCode />
                </Avatar>
            </ListItemAvatar>
        </ListItem>
        <ListItem>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44, color: 'white.main', cursor: 'pointer' }} onClick={logout}>
                    <FiLogOut />
                </Avatar>
            </ListItemAvatar>
        </ListItem>
    </List>
);

const CompanyHeader = ({ setOpenDrawer }) => {
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
        <Box style={headerStyle}>
            <p style={headerText}>Bro Code</p>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerClose}
                edge="start"
                sx={{ mr: 2, display: { sm: 'flex', md: 'none' } }}
            >
                <AiOutlineMenuFold color='#fff' />
            </IconButton>
        </Box>
    )
}

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ setIsCreating, setCreateType, setOpenDrawer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <Sidebar logout={logout} />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '240px', bgcolor: 'primary.main' }} >
                <CompanyHeader setOpenDrawer={setOpenDrawer} />
                <ChannelSearch />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                            setOpenDrawer={setOpenDrawer}
                        />
                    )}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="messaging"
                            setOpenDrawer={setOpenDrawer}
                        />
                    )}
                />
            </Box>
        </>
    );
}

const ChannelListContainer = ({ setIsCreating, setCreateType, openDrawer, setOpenDrawer }) => {

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, height: '100%', boxShadow: 'inset 1px 0px 0px #0000001a' }} >
                <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} />
            </Box>

            <Drawer variant='persistent' anchor="left" open={openDrawer} >
                <Box sx={drawerStyle}>
                    <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setOpenDrawer={setOpenDrawer} />
                </Box>
            </Drawer>
        </>
    )

}

export default ChannelListContainer;