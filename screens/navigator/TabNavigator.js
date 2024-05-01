import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, View} from 'react-native';
import Home from '../Home';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Bookmark from "react-native-vector-icons/MaterialCommunityIcons"
import Maps from '../Maps';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        keyboardHidesTabBar: true,
        labelStyle: {
          paddingBottom: 2,
          // fontSize: 10,
          fontFamily: 'AvenirLTStd-Roman',
          fontWeight: '400',
        },
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: '#07A64B',
        tabBarActiveBackgroundColor: '#FFFFFF',
        tabBarInactiveBackgroundColor: '#FFFFFF',
      }}>
         {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) =>
          <Bookmark size={focused ? 22 : 20} name='home'  color={focused ? "#07A64B" : "grey"}/>,
            // TabIcon(focused ? iconPath.ha : iconPath.h),
          headerShown: true,
        }}
      /> */}
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarLabel: 'Maps',
          tabBarIcon: ({focused}) =>
          <Icon size={focused ? 22 : 20} name='google-maps'  color={focused ? "#07A64B" : "grey"}/>,
            // TabIcon(focused ? iconPath.ha : iconPath.h),
          headerShown: true,
        }}
      />
      
     
    </Tab.Navigator>
  );
};
export default TabNavigator;
