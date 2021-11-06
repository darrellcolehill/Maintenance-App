function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(username, password) {
  // TODO make request from backend
  await delay(500);
  let fakeResponse = {
    token: 'just a placeholder',
  };

  return fakeResponse;
}
