import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { data } from "./sampleData";
import { List, FAB } from 'react-native-paper';
import * as Api from "../../api";

// renders each item in the list of messages
function MessageItem({ item, onPress }) {
  const { message, sender } = item;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>

     <List.Item
         title={item.sender}
         description={message}
         left={props => <List.Icon {...props} icon="folder" />}
       />

    </TouchableOpacity>
  );
}



// renders the messages screen with a list of messages
export function Messages({ navigation }) {

  const [messageData, setMessageData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

      const getMessages = async () => {
        
          let response = await Api.getMessages();

          setMessageData(response.messages);

		  setIsRefreshing(false);
        }


  const renderItem = ({ item }) => {
    return (
      <MessageItem
        item={item}
        onPress={() => navigation.navigate("Message content", { item: item })}
      />
    );
  };


  useEffect(() => {
      getMessages();
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={messageData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
	    onRefresh={() => {setIsRefreshing(true); getMessages();}}
	    refreshing={isRefreshing}
      />
      <FAB 
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("New message")}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: 32,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  }
});







// function to get and console.log message data for particular user
/*
      const [messageData, setMessageData] = useState();

      const getMessages = async () => {

          let response = await Api.getMessages();

          await setMessageData(response);

          console.log("===========================MESSAGES HERE===========================")
          await console.log(messageData.messages);
        }

*/










// RENDERS A BASIC BITCH VERSION OF THE MESSAGES FOR THE USER
/*
// renders the messages screen with a list of messages
export function Messages({ navigation }) {

  const [messageData, setMessageData] = useState([]);

    const getMessages = async () => {

        let response = await Api.getMessages();

        setMessageData(response.messages);
      }

   const renderItem = ({ item }) => {
       return (
         <Text>
           {item.message}
         </Text>
       );
     };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View>
        {messageData && (
                <FlatList
                  data={messageData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              )}
    </View>
  );
}
*/
