/*
 * Note: we don't always *need* to nest stack navigators inside
 * the main tab navigator. It's only needed when a tab can have
 * more than one screen. Otherwise we can put just the component
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { observer } from "mobx-react";
import { Home } from "../screens/Home";
import { CreatePost } from "../screens/Home/CreatePost";
import { PostContent } from "../screens/Home/PostContent";
import { UserContent } from "../screens/Home/UserContent";
import { Search } from "../screens/Home/Search";
import { Messages } from "../screens/Messages";
import { MessageContent } from "../screens/Messages/MessageContent";
import { NewMessage } from "../screens/Messages/NewMessage"
import { Profile } from "../screens/Profile";
import { LandlordFeed } from "../screens/LandlordFeed";
import { AuthStore } from "../stores/auth";
import { PostContentL } from "../screens/LandlordFeed/PostContentL";
import { AddLocation } from "../screens/Profile/AddLocation";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homepage" component={Home} />
      <Stack.Screen name="Create a Post" component={CreatePost}/>
      <Stack.Screen name="Post content" component={PostContent} />
      <Stack.Screen name="User content" component={UserContent} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

function MessagesNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Message Inbox" component={Messages} />
      <Stack.Screen name="Message content" component={MessageContent} />
      <Stack.Screen name="New message" component={NewMessage} />
    </Stack.Navigator>
  );
}

function ProfileNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User Profile" component={Profile} />
      <Stack.Screen name="Add a location" component={AddLocation} />
    </Stack.Navigator>
  );
}

function LandlordFeedNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Personalized Feed" component={LandlordFeed} />
      <Stack.Screen name="Tenant post" component={PostContentL} />
    </Stack.Navigator>
  );
}

const AppNavigator = observer(function () {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message" color={color} size={size} />
            ),
          }}
        />
        {AuthStore.isLandlord &&
          <Tab.Screen
              name="Feed"
              component={LandlordFeedNav}
              options={{
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons name="card-text" color={color} size={size} />
                ),
              }}
          />
        }
        <Tab.Screen
          name="Profile"
          component={ProfileNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
          
      </Tab.Navigator>

    );
})



export default AppNavigator;
