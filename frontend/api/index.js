/*
 * Functions for communicating with the backend
 */

 import AsyncStorage from '@react-native-async-storage/async-storage';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



const URL = 'COPY SERVER URL HERE'; // NOTE: for some reason, fetch will not let you use local host



// Parameters: plaintext username and plaintext password
// Return:
//  a) if successful, JSON data containing loginStatus and token
//        (NOTE: login status will be either 'Successful' or 'SOME_ERROR_MESSAGE')
//  b) if unsuccessful, null
// Post-conditions: sets token value on client to token value sent from server
export async function login(username, password) {

    try {
        //console.log(username + " " + password);
        const response = await fetch(URL + '/login', {

           method: 'POST',
           headers: {
               'Accept': '*/*',  // It can be used to overcome cors errors
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               username: username,
               password: password
             })

        });
        const json = await response.json();
        console.log(json); // TODO: delete after testing

        try {
            await AsyncStorage.setItem(
              'token',
              json.token
            );
          } catch (error) {
            console.log(error);
          }
        return json;

      } catch (error) {
        console.error(error);
      }

      return null;
}



// Parameters: none (uses token stored on client after login)
// Return:
//  a) if successful, JSON data containing all inboxes for the user (data stored in inconversation)
        // NOTE: the inconversation table contains all the conversations (inboxes) that a given user is in,
        // and that particular inbox's key (user1, user2)
//  b) if unsuccessful, null
export async function getInboxesByUsername() {

    const userToken = await AsyncStorage.getItem('token');

    try {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken !== null) {
          // We have data!!
          console.log("Token found");

           try {
                   const response = await fetch(URL + '/inboxDisplay', {

                      method: 'POST',
                      headers: {
                          'Accept': '*/*',  // It can be used to overcome cors errors
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          token: userToken
                        })

                   });
                   const json = await response.json();
                   console.log(json); // TODO: delete after testing
                   return json;

                 }
                 catch (error) {
                   console.error(error);
                 }

            }
        }
       catch (error) {
        // Error retrieving data
        console.log("Token not found");
      }

    return null;
}


// Parameters: recipient's username
// Return:
//  a) if successful, JSON data containing createInboxStatus
//        (NOTE: createInboxStatus will be either 'Successful' or 'SOME_ERROR_MESSAGE')
//  b) if unsuccessful, null
// Post-conditions: sets token value on client to token value sent from server
export async function createInbox(recipientUsername) {

    const userToken = await AsyncStorage.getItem('token');

    try {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken !== null) {
          // We have data!!
          console.log("Token found");

           try {
                   const response = await fetch(URL + '/createInbox', {

                      method: 'POST',
                      headers: {
                          'Accept': '*/*',  // It can be used to overcome cors errors
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          token: userToken,
                          username: recipientUsername
                        })

                   });
                   const json = await response.json();
                   console.log(json); // TODO: delete after testing
                   return json;

                 }
                 catch (error) {
                   console.error(error);
                 }

            }
        }
       catch (error) {
        // Error retrieving data
        console.log("Token not found");
      }

    return null;
}