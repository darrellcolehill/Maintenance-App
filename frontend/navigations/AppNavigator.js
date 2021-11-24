/*
 * Note: we don't always *need* to nest stack navigators inside
 * the main tab navigator. It's only needed when a tab can have
 * more than one screen. Otherwise we can put just the component
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Home } from "../screens/Home";
import { CreatePost } from "../screens/Home/CreatePost";
import { Messages } from "../screens/Messages";
import { MessageContent } from "../screens/Messages/MessageContent";
import { NewMessage } from "../screens/Messages/NewMessage"
import { Profile } from "../screens/Profile";
import { LandlordFeed } from "../screens/LandlordFeed";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const isLandlord = true;  // WILL NEED TO IMPLEMENT SERVER-SIDE CODE ONCE COMPLETE HERE!!!

function HomeNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Create a Post" component={CreatePost}/>
    </Stack.Navigator>
  );
}

function MessagesNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Message content" component={MessageContent} />
      <Stack.Screen name="New message" component={NewMessage} />
    </Stack.Navigator>
  );
}

function ProfileNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function LandlordFeedNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Personalized Feed" component={LandlordFeed} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  if(isLandlord)
  {
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
        <Tab.Screen
            name="Feed"
            component={LandlordFeedNav}
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="card-text" color={color} size={size} />
              ),
            }}
          />
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
  }

  else{
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
  }
}

export default AppNavigator;
