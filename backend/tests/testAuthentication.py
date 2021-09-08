import os
from pathlib import Path
import requests
import json

# load config file
config_path = os.path.join(Path(__file__).parent.parent, "config.json")
with open(config_path) as f:
    config = json.load(f)

# set global constants
baseAddress = f"http://localhost:{config['backendPort']}"
loginAddress = baseAddress + "/auth/login"
signupAddress = baseAddress + "/auth/signup"
protectedAddress = baseAddress + "/secret"

# run tests
def main():
    token = testLogin()
    testProtectedRoute(token)

def testLogin():
    # trying with correct details
    global loginAddress
    data = {
        "username": "abdullah",
        "password": "abdullah"
    }
    response = requests.post(loginAddress, data=data)
    assert(response.status_code == 200)
    # saving the correct token for later
    token = response.json()["token"]

    # trying with incorrect details
    data["password"] = "uh oh"
    response = requests.post(loginAddress, data=data)
    assert(response.status_code == 401)
    
    return token

def testProtectedRoute(token):
    # trying with a valid token
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(protectedAddress, headers=headers)
    assert(response.status_code == 200)

    # trying with an invalid token
    fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf58U"
    headers = {
        "Authorization": f"Bearer ${fakeToken}"
    }
    response = requests.get(protectedAddress, headers=headers)
    assert(response.status_code == 401)


if __name__ == "__main__":
    main()
