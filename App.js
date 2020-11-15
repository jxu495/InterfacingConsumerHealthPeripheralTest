import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, Alert, View } from 'react-native';
import { authorize, refresh, revoke } from 'react-native-app-auth'
import { CLIENT_ID, CLIENT_SECRET } from './secrets.js'
//https://github.com/FormidableLabs/react-native-app-auth#note-about-client-secrets go to android set up section and ios set up for things i need to do again
//need to npm install app auth still!!!
const config = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUrl: 'interfacing.consumer.health.peripherals://redirect', //note: path is required
  scopes: ['activity', 'sleep'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke'
  }
};

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: ''
};

const TestAPI = () => {
  const [authState, setAuthState] = useState(defaultAuthState)
  // Log in to get an authentication token
  //const authState = await authorize(config);
  
  const callAuthorize = useCallback(
    async () => {
      try {
        const newAuthState = await authorize(config)
        setAuthState({
          hasLoggedInOnce: true, 
          ...newAuthState
        });
      } catch (error) {
        Alert.alert('Failed to login', error.message)
      }
    }, [authState]
  );
  
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then((response) => response.json())
  //     .then((json) => setData(json.title))
  // }, []);

  return (
    <View>
      <Button
        title="Authorize"
        color="#A9F2E5"
        onPress={() => callAuthorize(config)}>
      </Button>
    </View>
  );
}

export default TestAPI;
