import React from "react"
import { View, Text } from "react-native";

// renders a full message. We come here when user clicks a message from the list
export function MessageContent({route}) {
    const { item } = route.params;
    const { sender, message } = item;
    return (
        <View>
            <Text>From: {sender}</Text>
            <Text>{message}</Text>
        </View>
    )
}