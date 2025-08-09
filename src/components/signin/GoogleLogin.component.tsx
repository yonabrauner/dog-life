import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase/config";
import * as AuthSession from 'expo-auth-session';


const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'doglife',
});

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "599300045306-8j1j087h4e290s97bnhm0jbhuks00rv3.apps.googleusercontent.com",
    });


  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { promptAsync, request };
}