import React from 'react';
import { 
    NavigationContainer,
    DefaultTheme
} from '@react-navigation/native';
import { 
    ListItem, 
    Avatar, 
    Icon,
} from '@rneui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EditEvent from '../screens/EditEvent';
const {Navigator, Screen} = createStackNavigator<any>()
const algoritcomTheme = {
    ...DefaultTheme,
};
const Tab = createBottomTabNavigator();
function Navigation() {
    return (
        <NavigationContainer theme={algoritcomTheme}>
        <Tab.Navigator screenOptions={{
          tabBarActiveTintColor: 'red', // Color for the active tab
          tabBarInactiveTintColor: 'white', // Color for inactive tabs
          tabBarStyle: { backgroundColor: '#6495ed',  }, // Background color for the tab bar
        }}>
            <Tab.Screen options={{ 
                    headerShown: false,
                    headerTitleAlign:'center',
                    title: 'AlgoritCom Events',
                 //   headerStyle: {backgroundColor:'primary'},
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                                
                                    name="trash"
                                    type="font-awesome-5"
                                    color="red"
                                />
                    ),
                    headerLeftLabelVisible:true
                }} name="Home" component={HomeScreen} />
            <Tab.Screen  options={{ 
                    headerShown: false,
                    headerTitleAlign:'center',
                    title: 'AlgoritCom Events',
                 //   headerStyle: {backgroundColor:'primary'},
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                                
                                    name="trash"
                                    type="font-awesome-5"
                                    color="red"
                                />
                    ),
                    headerLeftLabelVisible:true
                }}
            name="Settings"  component={EditEvent} />
        </Tab.Navigator>
      </NavigationContainer>
    );
}
/* function Navigation() {
    return (
        <NavigationContainer theme={algoritcomTheme}>
        <Tab.Navigator screenOptions={{
          tabBarActiveTintColor: 'red', // Color for the active tab
          tabBarInactiveTintColor: 'white', // Color for inactive tabs
          tabBarStyle: { backgroundColor: '#6495ed',  }, // Background color for the tab bar
        }}>
            <Tab.Screen options={{ 
                    headerShown: false,
                    headerTitleAlign:'center',
                    title: 'AlgoritCom Events',
                 //   headerStyle: {backgroundColor:'primary'},
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                                
                                    name="trash"
                                    type="font-awesome-5"
                                    color="red"
                                />
                    ),
                    headerLeftLabelVisible:true
                }} name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
} */

export default Navigation;