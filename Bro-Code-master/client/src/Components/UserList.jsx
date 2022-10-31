import React, { useState, useEffect } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { Box, styled, Typography } from '@mui/material';
import { FaUserPlus, FaUserMinus } from 'react-icons/fa'

const UserListContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
}))

const HeaderContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    justifyContent: 'space-between',
}))

const UserListMessage = styled(Box)(() => ({
    fontFamily: 'Helvetica Neue, sans-serif',
    fontSize: '16px',
    color: '#2c2c30',
    margin: '20px',
}))

const UserItemContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    justifyContent: 'space-between',
    "&:hover": {
        background: '#f7f6f8',
        cursor: 'pointer',
    }
}))

const ListContainer = ({ children }) => (
    <UserListContainer>
        <HeaderContainer>
            <p>User</p>
            <p>Invite</p>
        </HeaderContainer>
        {children}
    </UserListContainer>
)


const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        if (selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <UserItemContainer onClick={handleSelect}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: '2', textAlign: 'left' }}>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <Typography variant='subtitle1' component='p' sx={{ fontWeight: '500' }}>{user.fullName || user.id}</Typography>
            </Box>
            {selected ? <FaUserMinus height={28} width={28} /> : <FaUserPlus height={28} width={28} color='#787878 ' />}
        </UserItemContainer>
    )

}

const UserList = ({ setSelectedUsers }) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;

            setLoading(true);

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 },
                );

                if (response.users.length) {
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }

            } catch (error) {
                setError(error);
            }

            setLoading(false);
        }

        if (client) getUsers();

    }, [])

    if (error) {
        return (
            <ListContainer>
                <UserListMessage>
                    Error loading, please refresh and try again.
                </UserListMessage>
            </ListContainer>
        )
    }

    if (listEmpty) {
        return (
            <ListContainer>
                <UserListMessage>
                    No User found.
                </UserListMessage>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ?
                <UserListMessage>
                    Loading Users...
                </UserListMessage>
                : (
                    users?.map((user, i) => (
                        <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                    ))
                )}
        </ListContainer>
    )
}

export default UserList