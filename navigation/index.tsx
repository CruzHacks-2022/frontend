/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Entypo, Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CameraScreen from '../screens/CameraScreen';
import DetailsScreen from '../screens/DetailsScreen';
import PillScreen from '../screens/PillScreen';

import TabOneScreen from '../screens/TabOneScreen';

export default function Navigation() {
  return (
    <NavigationContainer
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        // @ts-ignore
        options={({ route }) => ({ title: route.params.name })} />
      <Stack.Screen name="Prescription Bottle Mode" component={CameraScreen} />
      <Stack.Screen name="Pill Mode" component={PillScreen} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator({ navigation }: any) {

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "white",
      }}>

      <BottomTab.Screen
        name="Prescription Bottle Mode"
        component={CameraScreen}
        options={() => ({
          title: 'Prescription Bottle Mode',
          tabBarIcon: () => {
            return (
              <View style={{ justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Prescription Bottle Mode') }}>
                  <View>
                    <FontAwesome5 
                      name="prescription-bottle" 
                      size={24}
                      color="black"
                      style={{
                        alignSelf: 'center',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )
          }
        })}
      />

      <BottomTab.Screen
        name="Home"
        component={TabOneScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color="black" />,
        })}
      />

      <BottomTab.Screen
        name="Pill Mode"
        component={CameraScreen}
        options={() => ({
          title: 'Pill Mode',
          tabBarIcon: () => {
            return (
              <View style={{ justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Pill Mode') }}>
                  <View>
                    <MaterialCommunityIcons 
                      name="pill" 
                      size={24}
                      color="black"
                      style={{
                        alignSelf: 'center',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                      }}
                    />
                    
                  </View>
                </TouchableOpacity>
              </View>
            )
          }
        })}
      />

    </BottomTab.Navigator>
  );
}
