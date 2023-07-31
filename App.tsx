
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useAuthentication } from './hooks/useAuthentication';
import AppNavigator from './navigators/homeNavigator';
import { AppTabNavigation } from './navigators/appTabNavigator';
import AuthNavigator from './navigators/authNavigator';


export default function App() {
  const { user } = useAuthentication();
  const isLoggedIn = Boolean(user);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '10%' : '10%' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
        style={{ flex: 1 }}
      >
        <StatusBar style="auto" />
        {isLoggedIn ? <AppTabNavigation /> : <AuthNavigator />}
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
