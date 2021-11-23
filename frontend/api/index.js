/*
 * Functions for communicating with the backend
 */

import { AuthStore } from "../stores/auth";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



const URL = 'PUT URL HERE'; // NOTE: for some reason, fetch will not let you use local host



export async function login(username, password) {
  // TODO make request from backend
  await delay(500);
  let fakeResponse = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhYnViYWtyIiwiaWF0IjoxNjM3NjgwOTg4LCJleHAiOjE2Mzc3NjczODh9.LsTotjZ3l1FGXK9OPPUoZoIHG_2WF1n0anV8Fsp5YsQ",
  };

  return fakeResponse;
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
 * @param {String} data information about the search
 * @param data.location location to search posts from
 */
export async function searchPosts(data) {
  let token = AuthStore.token;
  try {
    const response = await fetch(URL + '/posts/search', {
      method: 'GET',
      headers: {
        'Accept': '*/*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data) // TODO review this 
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
