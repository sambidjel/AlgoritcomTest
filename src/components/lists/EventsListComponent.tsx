import React from 'react';
import { 
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    Image,
    Alert,
} from 'react-native';
import { 
    ListItem, 
    Avatar, 
    Icon,
} from '@rneui/themed';
import {Event} from '../../static-data/eventLists/eventsList';
import {MotiView} from 'moti';

type Props = {
    navigation:any,
    editEvent: (value: Event, snapPoint:number) => void; 
    deleteEvent: (value: Event) => void;
    eventsListArr:Event[]
}

function EventsListComponent(props:Props) {
     // Function to edit Event
    const editEvent = (item:Event, value: number) => {
        props.editEvent(item, value);  
    };
     // Function to delete Event
    const deleteEvent = (value: Event) => {
        props.deleteEvent(value);
    };

    const renderItems=({item, index}:any)=>{ //onPress={()=>props.navigation.navigate('CompanyDetailsScreen')}   
    return (
        <View>
            <MotiView
            style={[styles.listContainer]}
            from={{opacity:0, translateY:50}}
            animate={{opacity:1, translateY:0}}
            transition={{delay:1000+index*200}}>
                <View style={styles.imageContainer}>
                    <ListItem.Swipeable style={styles.listIemSwipeable}
                        rightContent={(reset) => (
                            <>
                            <View style={{ 
                                paddingTop:30,
                                paddingHorizontal:20,
                                flexDirection: 'row', alignItems: 'center',justifyContent: 'flex-end', }}>
                                <Icon
                                    raised
                                    name="edit"
                                    type="font-awesome-5"
                                    color="blue"
                                    onPress={() => editEvent(item, 1) }
                                />
                                <Icon
                                    raised
                                    name="trash"
                                    type="font-awesome-5"
                                    color="red"
                                    onPress={() => deleteEvent(item)}
                                />
                            </View>
                        </>
                        )}
                        >
                        <Avatar
                        size={100}
                        rounded
                        > 
                            <Image
                                source={{uri:item.image}}
                                style={{ width: '100%', height: '100%', borderRadius: 100, resizeMode: 'cover', padding:0, margin:0 }}
                            />
                        </Avatar>
                        <ListItem.Content style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            alignItems: 'center'}}>
                        <View> 
                            <ListItem.Title style={styles.title}>{item.eventName} {item.id}</ListItem.Title>
                            <ListItem.Subtitle style={styles.subTitle}>{item.eventDescription}</ListItem.Subtitle>
                            <ListItem.Subtitle>{item.eventDate}</ListItem.Subtitle>
                        </View>
                        <Icon
                            raised
                            name="arrows-alt-h"
                            type="font-awesome-5"
                            color="#000"
                            onPress={() => console.log('hello')}
                        />
                        </ListItem.Content>
                        </ListItem.Swipeable>
                    </View>
            </MotiView>
        </View>
    )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={props.eventsListArr}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainer: {
        backgroundColor: '#f5f4f2',
        margin: 10,
        borderRadius: 20,
    },
    imageContainer: {
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow: 'hidden',
    },
    listIemSwipeable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
    },
    title:{
        fontWeight:'bold', 
        fontSize:18
    },
    subTitle:{
        fontWeight:'normal', 
        fontSize:16
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
  });
export default EventsListComponent;