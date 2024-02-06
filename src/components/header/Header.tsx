import React from 'react';
import {
    View, 
    StyleSheet, 
    Platform, 
    Image } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { 
    Header as HeaderRNE, 
    Text } from '@rneui/themed';
type Props = {
    active:SharedValue<boolean>
}

function Header({active,}:Props) {
    return (
    <>
        <View style={styles.headerHolder}>
            <HeaderRNE
            containerStyle={{}}
            leftComponent={
                <TouchableOpacity style={styles.leftComponentHolder}  
                onPress={()=>active.value=true}>
                    <Image style={styles.userAvatar} 
                    source={require('../../assets/images/common/user-avatar.png')} />
                </TouchableOpacity>
            }
            centerComponent={
                <>
                    <TouchableOpacity style={styles.centerComponentHolder}> 
                            <Text style={styles.headingText}>Eventos Algoritcom </Text>
                    </TouchableOpacity> 
                </>
            }
            />  
        </View>   
    </>
    );
}
const styles = StyleSheet.create({
    headerHolder:{
        borderBottomWidth:1,
        borderBlockColor:'#ccc',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 0,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal:40
    },
    leftComponentHolder:{
        backgroundColor: 'white', 
        borderRadius: 50,
        width:50,
        height:50,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 5,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    userAvatar:{
        width:50,
        height:50,
        borderRadius: 100,
        borderColor:'black',
        borderWidth:1,
    },
    centerComponentHolder:{
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    headingText: {
        paddingTop:10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
export default Header;