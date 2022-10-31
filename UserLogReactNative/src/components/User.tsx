import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const User: React.FC<{
  name: string;
  avatar_url: string;
  selected?: boolean;
  onPress?: any;
}> = ({name, avatar_url, selected, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        selected ? styles.selectedUser : styles.notSelectedUser,
        styles.container,
      ]}>
      <View style={styles.imgContainer}>
        <Image style={styles.imgContainer} source={{uri: avatar_url}} />
      </View>
      <Text style={styles.userNameTxt}>{name}</Text>
    </TouchableOpacity>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    marginVertical: 1,
  },
  notSelectedUser: {
    backgroundColor: Colors.PRIMARY.NOT_SELECTED,
  },
  selectedUser: {
    backgroundColor: Colors.PRIMARY.SELECTED,
  },
  imgContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  userNameTxt: {
    fontFamily: 'Syne-regular',
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BLACK,
  },
});
