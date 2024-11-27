import * as React from 'react';

import { ActionSheetIOS, SafeAreaView, StatusBar, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AboutUsScreen from './src/screens/AboutUs/AboutUs';

import AuthScreen from './src/screens/Auth/Auth/Auth';
import LoginScreen from './src/screens/Auth/Login/Login';
import SignupScreen from './src/screens/Auth/Signup/Signup';
import PasswordForgotScreen from './src/screens/Auth/PasswordForgot/PasswordForgot';
import PersonalDataPhotoScreen from './src/screens/Auth/PersonalDataPhoto/PersonalDataPhoto';

import HomeScreen from './src/screens/Home/Home';

import ProfileScreen from './src/screens/Profile/Profile';

import ChatScreen from './src/screens/Chat/Chat';
import ChatEditorScreen from './src/screens/Chat/ChatEditor/ChatEditor';
import ChatCreatorScreen from './src/screens/Chat/ChatCreator/ChatCreator';
import ChatMessagesScreen from './src/screens/Chat/ChatMessages/ChatMessages';
import { AccountContext, accountContextData } from './src/contexts/accounts';
import { navigationRef } from './src/utils/navigate';
import { AccountData } from './src/types';
import usePersisted from './src/hooks/Persisted/Persisted';
import AsyncStorage from "@react-native-async-storage/async-storage";
import HireScreen from './src/screens/Hire/Hire';

const Stack = createNativeStackNavigator( );

export default function App( ) {
  const [account, setAccount] = usePersisted("account", accountContextData);

  const handleUpdate = (data: any) => {
    setAccount(data, true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#ffffff"} barStyle={'dark-content'} />

      {/* TODO: Add lazy load */}
      <AccountContext.Provider value={{ ...account, update: handleUpdate }}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName='auth' screenOptions={{ headerShown: false }}>
              <Stack.Screen name="about-us" component={AboutUsScreen} />

              <Stack.Screen name="auth" component={AuthScreen} />
              <Stack.Screen name="auth-login" component={LoginScreen} />
              <Stack.Screen name="auth-signup" component={SignupScreen} />
              <Stack.Screen name="auth-password-forgot" component={PasswordForgotScreen} />
              <Stack.Screen name='auth-personal-photos' component={PersonalDataPhotoScreen} />

              <Stack.Screen name="home" component={HomeScreen} />

              <Stack.Screen name="hire" component={HireScreen} />

              <Stack.Screen name="chat" component={ChatScreen} />
              <Stack.Screen name="chat-editor" component={ChatEditorScreen} />
              <Stack.Screen name="chat-creator" component={ChatCreatorScreen} />
              <Stack.Screen name="chat-messages" component={ChatMessagesScreen} />

              <Stack.Screen name="profile" component={ProfileScreen} />
              <Stack.Screen name="profile-editor" component={AuthScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AccountContext.Provider>
    </SafeAreaView>
  );
};