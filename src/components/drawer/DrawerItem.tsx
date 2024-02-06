import {
  TouchableOpacity,
  StyleSheet, 
  Text, 
  View} from 'react-native';
import React from 'react';
import { 
  ListItem, 
  Avatar, 
  Icon,} from '@rneui/themed';
import {DrawerListType} from '../../static-data/navigation/data';
type Props = {
  item: DrawerListType;
  onPress?: () => void;
};

const DrawerItem = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name='user' type="font-awesome" />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  image: {
    width: 26,
    height: 26,
  },
  text: {
    fontWeight: 'normal',
    color: 'gray',
    fontSize: 16,
  },
});
