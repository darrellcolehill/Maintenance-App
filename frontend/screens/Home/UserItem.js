import React from "react";
import { TouchableOpacity } from "react-native";
import { List } from "react-native-paper";

export default function UserItem({ item, onPress }) {
    const { username } = item;
  
    return (
      <TouchableOpacity onPress={onPress}>
  
        <List.Item
          title={username}
          left={props => <List.Icon {...props} icon="folder" />}
        />
  
      </TouchableOpacity>
    );
  }
