/*
 * Functions for communicating with the backend
 */

 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { AuthStore } from "../stores/auth";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



const URL = 'http://4691-72-188-118-58.ngrok.io'; // NOTE: for some reason, fetch will not let you use local host



// Parameters: plaintext username and plaintext password
// Return:
//  a) if successful, JSON data containing message, token (for user validation), and roles
//        (NOTE: message will be either 'Successful' or 'SOME_ERROR_MESSAGE')
//        (NOTE: token now contains the users username, and role information)
//  b) if unsuccessful, null
// Post-conditions: stores token and roles on client side using asyncStorage
export async function login(username, password) {

    try {
        //console.log(username + " " + password);
        const response = await fetch(URL + '/auth/login', {

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

        return json;

      } catch (error) {
        console.error(error);
      }

      return null;
}



// Parameters: plaintext username and plaintext password boolean isTenant, isLandlord, isHandyman, and isHomeowner
// Return:
//  a) if successful, JSON data containing message and token
//        (NOTE: message will be either 'Successful' or 'SOME_ERROR_MESSAGE')
//  b) if unsuccessful, null
// Post-conditions: sets token value on client to token value sent from server
export async function signup(username, password, email, isTenant, isLandlord, isHandyman, isHomeowner) {

    try {
        //console.log(username + " " + password);
        const response = await fetch(URL + '/auth/signup', {

           method: 'POST',
           headers: {
               'Accept': '*/*',  // It can be used to overcome cors errors
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               username: username,
               password: password,
               email: email,
               isTenant: isTenant,
               isLandlord: isLandlord,
               isHandyman: isHandyman,
               isHomeowner: isHomeowner
             })

        });
        const json = await response.json();
        console.log(json); // TODO: delete after testing


        return json;

      } catch (error) {
        console.error(error);
      }

      return null;
}



// Sends message to user specified
// Returns: json data containing status information
export async function sendMessage(receiver, message) {

  try {

      //const userToken = await AsyncStorage.getItem('token');         // TODO: REMOVE AFTER TESTING
      const userToken = AuthStore.token;
      console.log("sender token = " + userToken);

      const response = await fetch(URL + '/messaging/sendMessage', {

         method: 'POST',
         headers: {
             'Accept': '*/*',  // It can be used to overcome cors errors
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
              sender: userToken,
              receiver: receiver,
              message: message 
           })

      });
      const json = await response.json();
      //console.log(json); // TODO: delete after testing

      return json;

    } catch (error) {
      console.error(error);
    }

    return null;
}



//
// Returns: json data of messages where the current user is the receiver
export async function getMessages() {

  try {
      
      const userToken = AuthStore.token;

      const response = await fetch(URL + '/messaging/getMessages', {

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

    } catch (error) {
      console.error(error);
    }

    return null;
}



// TODO: need to test
export async function getCurrentUserRatings() {

  try {
    const userToken = AuthStore.token;

    const response = await fetch(URL + '/rating/getCurrentUserRatings', {

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

  } catch (error) {
    console.error(error);
  }

  return null;

}



// TODO: need to test
export async function getUserRatings(requestedUser) {

  try {
      
    const userToken = AuthStore.token;

    const response = await fetch(URL + '/rating/getUserRating', {

       method: 'POST',
       headers: {
           'Accept': '*/*',  // It can be used to overcome cors errors
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            token: userToken,
            requestedUser: requestedUser
         })

    });
    const json = await response.json();
    console.log(json); // TODO: delete after testing


    return json;

  } catch (error) {
    console.error(error);
  }

  return null;

}


// TODO: need to test
export async function giveUserRatings(requestedUser, rating, role) {

  try {
      
    const userToken = AuthStore.token;

    const response = await fetch(URL + '/rating/giveUserRatings', {

       method: 'POST',
       headers: {
           'Accept': '*/*',  // It can be used to overcome cors errors
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            token: userToken,
            requestedUser: requestedUser,
            rating: rating,
            role: role
         })

    });
    const json = await response.json();
    console.log(json); // TODO: delete after testing


    return json;

  } catch (error) {
    console.error(error);
  }

  return null;

}


/**
 * @param {Object} data information about the post
 * @param data.PrivacyStatus 0 for a public post, 1 for a private post
 * @param data.ClaimStatus 0 for unclaimed, 1 for claimed
 * @param data.date the post's date
 * @param data.image an image to go with the post. set null for no image
 * @param data.author author of the post
 * @param data.caption caption for the post
 * @param data.location location of the post
 */
export async function makePost(data) {
  let token = AuthStore.token;
  try {
    const response = await fetch(URL + '/posts/makePost', {
      method: 'POST',
      headers: {
        'Accept': '*/*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();
    console.log(json); // TODO: delete later after testing
    return json;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 
 * @param {Object} data information about the search
 * @param data.location location to search posts from
 */
export async function searchPosts(data) {
  let token = AuthStore.token;

  try {
    const response = await fetch(URL + '/posts/search/' + data.location, {
      method: 'GET',
      headers: {
        'Accept': '*/*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });

    const json = await response.json();
    console.log(json); // TODO: delete later after testing
    return json;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 
 * @param {Object} data information about the search
 * @param data.username username to search for
 */
 export async function searchUsers(data) {
  let token = AuthStore.token;

  try {
    const response = await fetch(URL + '/users/search/' + data.username, {
      method: 'GET',
      headers: {
        'Accept': '*/*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });

    const json = await response.json();
    console.log(json); // TODO: delete later after testing
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getFeed() {
  let token = AuthStore.token;
  try {
    const response = await fetch(URL + '/posts/getFeed', {
      method: 'GET',
      headers: {
        'Accept': '*/*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });

    const json = await response.json();
    console.log(json); // TODO: delete later after testing
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getLFeed() {
  let token = AuthStore.token;
  try {
    const response = await fetch(URL + '/posts/getLFeed', {
      method: 'GET',
      headers: {
        'Accept': '*/*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });

    const json = await response.json();
    console.log(json); // TODO: delete later after testing
    return json;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 
 * @param {Object} data information to send server
 * @param data.location new location
 */
export async function setOwnLocation(data) {
  let token = AuthStore.token;
  try {
    const response = await fetch(URL + '/users/setOwnLocation', {
      method: 'POST',
      headers: {
        'Accept': '*/*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error(error);
  }
}
