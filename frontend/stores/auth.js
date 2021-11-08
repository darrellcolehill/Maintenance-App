/*
 * Manages authentication state (whether logged in, token, username, etc)
 */

import { makeAutoObservable } from "mobx";

class AuthModel {
  username = "";
  loggedIn = false;

  // for authentication with backend (not used yet)
  token = "";

  // to show a loading screen if login is taking time
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  login(username, token) {
    this.username = username;
    this.loggedIn = true;
    this.token = token;
  }

  logout() {
    this.loggedIn = false;
  }
}

export const AuthStore = new AuthModel();
