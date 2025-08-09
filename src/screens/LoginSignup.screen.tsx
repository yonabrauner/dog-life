import React, { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { useGoogleAuth } from "../components/signin/GoogleLogin.component";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "react-native-gesture-handler";
import { loginUser, logoutUser, registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";



export function LoginSignup() {
    const dispatch = useAppDispatch();
    const userState = useSelector((state: RootState) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const handleRegister = () => {
        if (!email || !password || !nickname) {
        alert('Please fill out all fields.');
        return;
        }
        dispatch(registerUser({ email, password, nickname }));
    };

    const handleLogin = () => {
        if (!email || !password) {
        alert('Please enter email and password.');
        return;
        }
        dispatch(loginUser({ email, password }));
    };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Dog Life - Sign In / Register</Text>

        {userState.uid ? (
            <>
            <Text style={styles.text}>Welcome, {userState.nickname || userState.email}!</Text>
            <Button title="Logout" onPress={() => dispatch(logoutUser())} />
            </>
        ) : (
            <>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Nickname (only for registration)"
                value={nickname}
                onChangeText={setNickname}
            />

            {userState.status === 'loading' && <Text style={styles.text}>Loading...</Text>}
            {userState.error && <Text style={styles.error}>{userState.error}</Text>}

            <Button title="Register" onPress={handleRegister} />
            <Button title="Login" onPress={handleLogin} />
            </>
        )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});