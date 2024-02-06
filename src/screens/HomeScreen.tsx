import React from 'react';

import { 
    Card, 
    Button,
} from '@rneui/themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
  } from 'react-native-reanimated';
import EventsListComponent from "../components/lists/EventsListComponent";
import Drawer from '../components/drawer/Drawer';
import Header from '../components/header/Header';
import { Props, Event } from '../types/Types';
import { useEventContext } from '../static-data/eventLists/EventContext';

function HomeScreen(props:Props) {
    const active = useSharedValue<boolean>(false);
    const drawerWidth = useSharedValue<number>(1000);
    const darawerTranslateX = useSharedValue<number>(-drawerWidth.value);
    const { eventsList } = useEventContext();
    const { deleteEvent } = useEventContext();
    const editEvent = (item:Event, value: number) => {
        props.navigation.navigate('EditEvent', { selectedItem: item });
    };
    const deleteEventItem = (item: Event) => {
       deleteEvent(item.id)
    };  
    return (
    <>
        <SafeAreaProvider>
            <GestureHandlerRootView style={{flex:1}}>

                <Drawer
                active={active}
                translateX={darawerTranslateX}
                drawerWidth={drawerWidth}/>

                <Animated.View style={[]}>
                    <Header active={active} />
                </Animated.View>

                <Animated.View style={{flex:1}}>
                {eventsList.length > 0 ? (
                <EventsListComponent
                    {...props}
                    eventsListArr={eventsList}
                    editEvent={editEvent}
                    deleteEvent={deleteEventItem}
                />
                ) : (
                    <Card>
                        <Card.Title>NO HAY EVENTOS PROGRAMADOS</Card.Title>
                        <Card.Divider/>
                        <Button onPress={() =>props.navigation.navigate('CreateEvent')}>
                            CREAR EVENTO
                        </Button>
                    </Card>
                )}
                </Animated.View>

            </GestureHandlerRootView>
        </SafeAreaProvider>
    </>
    );
}
export default HomeScreen;