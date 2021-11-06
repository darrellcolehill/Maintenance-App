import { AuthStore } from '../stores/auth';
import * as Api from '../api';

export let performLogin = async (username, password) => {
  AuthStore.startLoading();
  let response = await Api.login(username, password);
  let token = response.token;
  AuthStore.stopLoading();

  AuthStore.login(username, token);
};
