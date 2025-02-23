import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Background from '../components/Background';
import { theme } from '../core/theme';

export default function AuthLoadingScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let auth;
    try {
      auth = getAuth(); // Ensure Firebase Auth is initialized
    } catch (err) {
      console.error("Firebase Auth initialization error:", err);
      setError("Firebase initialization failed.");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User authentication state changed:", user);
      setLoading(false);

      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        });
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, [navigation]);

  // Debugging logs
  console.log("Primary Theme Color:", theme.colors?.primary);

  return (
      <Background>
        {error ? (
            <View>
              <Text style={{ color: 'red' }}>Error: {error}</Text>
            </View>
        ) : loading ? (
            <ActivityIndicator size={40} color={theme.colors?.primary || "blue"} />
        ) : (
            <View>
              <Text style={{ color: 'white' }}>Redirecting...</Text>
            </View>
        )}
      </Background>
  );
}
