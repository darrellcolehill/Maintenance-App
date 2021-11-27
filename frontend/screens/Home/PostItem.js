import React from "react";
import { TouchableOpacity } from "react-native";
import { List } from "react-native-paper";

export default function PostItem({ item, onPress }) {
    const { caption, location } = item;
  
    return (
      <TouchableOpacity onPress={onPress}>
  
        <List.Item
          title={location}
          description={caption}
          left={props => <List.Icon {...props} icon="folder" />}
        />
  
      </TouchableOpacity>
    );
  }
  