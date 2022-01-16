/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CameraScreen from '../screens/CameraScreen';
import DetailsScreen from '../screens/DetailsScreen';

import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        // @ts-ignore
        options={({ route }) => ({ title: route.params.name })} />
      <Stack.Screen name="Pic" component={CameraScreen} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({navigation}:any) {

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "white",
      }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color="black" />,
        })}
      />

      <BottomTab.Screen
        name="Pic"
        component={CameraScreen}
        options={() => ({   
          tabBarIcon: () => {
            return (
              <View style={{ justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Pic') }}>
                  <View>
                    <Feather
                      name="camera"
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
