import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { AiOutlinePlusCircle } from 'react-icons/ai'

const HeaderTypography = styled(Typography)(() => ({
    fontFamily: 'Helvetica Neue, sans - serif',
    fontSize: '13px',
    lineHeight: '16px',
    height: '16px',
    color: 'rgba(255, 255, 255, 0.66)'
}))

const ContainerBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '005fff'
}))

const TeamChannelList = ({ children, error = false, loading, type, setIsCreating, setCreateType }) => {

    const handleCreateClick = () => {
        type = type == "team" ? 'team' : 'messaging'
        setCreateType(type);
        setIsCreating(true);
    }

    if (error) {
        return type === 'team' ? (
            <ContainerBox >
                <Typography variant="subtitle1" color={'#fff'}>
                    Connection error, please wait a moment and try again.
                </Typography>
            </ContainerBox>
        ) : null
    }

    if (loading) {
        return (
            <ContainerBox >
                <Typography variant="subtitle1" color={'#fff'} height='115px'>
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </Typography>
            </ContainerBox>
        )
    }

    return (
        <ContainerBox >
            <Box display='flex' justifyContent='space-between' alignItems='center' padding='0 16px' margin='10px 0' >
                <HeaderTypography>
                    {type === 'team' ? 'Channels' : ' Direct Messages'}
                </HeaderTypography>
                <AiOutlinePlusCircle color='#fff' cursor={'pointer'} onClick={handleCreateClick} />
            </Box>
            {children}
        </ContainerBox>
    )
}

export default TeamChannelList