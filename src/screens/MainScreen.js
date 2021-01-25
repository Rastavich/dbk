import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AssetListScreen} from './AssetListScreen';
import {DetailsScreen} from './DetailsScreen';

const Stack = createStackNavigator();

export function MainScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AssetListScreen"
        component={AssetListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
