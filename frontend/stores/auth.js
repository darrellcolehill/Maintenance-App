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

  // Boolean values for role information
  isLandlord = false;
  isTenant = false;
  isHandyman = false;
  isHomeowner = false;
  

  constructor() {
    makeAutoObservable(this);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  login(username, token, isLandlord, isTenant, isHandyman, isHomeowner) {
    this.username = username;
    this.loggedIn = true;
    this.token = token;
    this.isLandlord = isLandlord;
    this.isTenant = isTenant;
    this.isHandyman = isHandyman;
    this.isHomeowner = isHomeowner;
  }

  logout() {
    this.loggedIn = false;
  }
}

export const AuthStore = new AuthModel();
