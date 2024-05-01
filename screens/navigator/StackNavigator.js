import React, {useRef} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import Maps from '../Maps';

const Stack = createStackNavigator();
const StackNavigator = () => {

  const navigationRef = useRef();

  return (
    <NavigationContainer ref={navigationRef}>
    <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false, headerBackTitleVisible: false}}
        />
        </Stack.Navigator>
        {/* <Stack.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarLabel: 'Maps',
          tabBarIcon: ({focused}) =>
          <Icon size={focused ? 22 : 20} name='google-maps'  color={focused ? "#07A64B" : "grey"}/>,
            // TabIcon(focused ? iconPath.ha : iconPath.h),
          headerShown: true,
        }}
      /> */}
    </NavigationContainer>
  );
};
export default StackNavigator;
