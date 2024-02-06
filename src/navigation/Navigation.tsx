import React from 'react';
import { 
    NavigationContainer,
    DefaultTheme
} from '@react-navigation/native';
import { 
    StatusBar,
  } from "react-native";
import { 
    Icon,
} from '@rneui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EditEvent from '../screens/EditEvent';
import CreateEvent from '../screens/CreateEvent';

const algoritcomTheme = {
    ...DefaultTheme,
};
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EditEvent"
        component={EditEvent}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
function Navigation() {
    return (
        <>
         <StatusBar
        hidden={true}
        translucent
        barStyle="dark-content"
        backgroundColor={'white'}
        />
        <NavigationContainer theme={algoritcomTheme}>
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
        }}>
            <Tab.Screen options={{ 
                headerShown: false,
                headerTitleAlign:'center',
                title: 'Eventos',
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarLabelStyle: { fontSize: 20 },
                tabBarIcon: ({focused }) => (
                    <Icon
                    name='calendar'
                    type="font-awesome-5"
                    color={focused ? 'blue' : 'gray'}
                    />
                ),
                headerLeftLabelVisible:true
                }} 
                name="HomeTab" 
                component={HomeStackScreen} />
            <Tab.Screen  options={{ 
                headerShown: false,
                headerTitleAlign:'center',
                title: 'Crear Evento',
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarLabelStyle: { fontSize: 20 },
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon
                    
                    name="calendar-plus"
                    type="font-awesome-5"
                    color={focused ? 'blue' : 'gray'}
                    />
                    ),
                    headerLeftLabelVisible:true
                }}
                name="CreateEvent"  component={CreateEvent} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
    );
}
export default Navigation;