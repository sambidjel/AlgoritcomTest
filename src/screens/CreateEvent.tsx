import React, {useState, useEffect, useRef,} from 'react';
import { 
    StyleSheet,
    View,
    Alert,
    TextInput,
    TouchableOpacity,
    Image
  } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
  } from 'react-native-reanimated';
import { 
    Text, 
    Card, 
    Avatar,
    Button,
} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary, } from 'react-native-image-picker';
import { Formik,  FormikHelpers } from "formik";
import * as Yup from "yup";
import Drawer from '../components/drawer/Drawer';
import Header from '../components/header/Header';
import { Props, Event } from '../types/Types';
import { useEventContext } from '../static-data/eventLists/EventContext';
import AppTextInput from '../components/text-input/AppTextInput';
import AppErrorMessage from '../components/error-message/AppErrorMessage';
import defaultStyles from '../config/styles/styles';
const validationSchema=Yup.object().shape({
    eventName:Yup.string().required().label('Nombre de evento'),
    eventDescription:Yup.string().required().label('Descripcion de evento'),
    eventDate:Yup.string().required().label('Fecha de evento') 
});
function CreateEvent(props:Props) {
    const formikRef = useRef<FormikHelpers<{eventName: string, eventDescription: string, eventDate: string, image: string}> | null>(null);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    const active = useSharedValue<boolean>(false);
    const [selectedImage, setSelectedImage]=useState()
    const drawerWidth = useSharedValue<number>(1000);
    const darawerTranslateX = useSharedValue<number>(-drawerWidth.value);
    
    useEffect(() => {
        // Reset form values when the component is mounted
        setSelectedImage(undefined);
        (formikRef.current as any)?.resetForm();
        formikRef.current?.setFieldValue('eventName','')
        formikRef.current?.setFieldValue('eventDescription','')
        formikRef.current?.setFieldValue('eventDate','')
        formikRef.current?.setFieldValue('image','')
        setDate(new Date());
      }, []);
    const { addEvent } = useEventContext();
    function generateId() {
        const timestamp = new Date().getTime();
        return `${timestamp}`;
    }
    const handleAddEvent = (newEvent: Event) => {
       addEvent(newEvent);
       formikRef.current?.resetForm();
       Alert.alert(
        'Evento Creado',
        `Evento ${newEvent.eventName} ha sido creado con exito`,
        [
          { text: 'OK', onPress: () =>props.navigation.navigate('Home') }
        ],
        { cancelable: false }
      );
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
                <Formik
                initialValues={{
                    eventName:'', 
                    eventDescription:'', 
                    eventDate:'', 
                    image:'' }
                }
                onSubmit={(values)=>{
                    const eventItem:Event ={
                        id: generateId(),
                        eventName: values.eventName,
                        eventDescription: values.eventDescription,
                        eventDate: date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                        image: selectedImage,
                    }
                    handleAddEvent(eventItem)
                }}
                validationSchema={validationSchema}
                innerRef={(formik) => {
                    // Save the Formik ref
                    formikRef.current = formik;
                }}
                >
                 {({handleChange, handleSubmit, setFieldValue, errors, setFieldTouched, touched})=>{
                    return (
                <>
                    <Card containerStyle={{ marginTop: 15,}}>
                        <Card.Title>Crear Evento </Card.Title>
                        <Card.Divider />

                        <AppTextInput 
                        placeholder='Nombre de evento' 
                        onChangeText={handleChange('eventName')}
                        onBlur={()=>setFieldTouched('eventName')}
                        clearButtonMode='always' />
                        <AppErrorMessage error={errors.eventName} visible={!!errors.eventName} />
                        
                        <AppTextInput 
                        placeholder='Descripcion de evento' 
                        onChangeText={handleChange('eventDescription')}
                        onBlur={()=>setFieldTouched('eventDescription')}
                        clearButtonMode='always' />
                        <AppErrorMessage error={errors.eventDescription} visible={!!errors.eventDescription}  />
                        
                   
                        <TouchableOpacity 
                        onPress={() =>setOpen(true)}
                        >
                           <TextInput 
                            clearButtonMode='always'
                            readOnly
                            style={styles.input}
                            onChangeText={handleChange("eventDate")}
                            placeholder='Fecha de evento'>Fecha de evento: {date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TextInput>
                            <AppErrorMessage error={errors.eventDate} visible={!!errors.eventDate} />
                           <DatePicker
                                modal
                                locale='es'
                                title='Seleccionar fecha de evento'
                                mode='date'
                                confirmText='Confirmar'
                                cancelText='Cerrar'
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                    setFieldValue("eventDate", date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </TouchableOpacity>

                        <View style={{marginTop:20}}>
                            <Button 
                            type="outline" 
                            title="Subir Imagen"
                            onPress={()=>{
                                let options:any={
                                    storageOptions:{
                                        path:'iamge'
                                    }
                                }
                                launchImageLibrary(options, (response:any) => { 
                                    setSelectedImage(response.assets[0].uri);
                                    setFieldValue("image", response.assets[0].uri);
                                })
                            }}
                            />
                        </View>
                        <View style={{marginTop:20}}>
                        {selectedImage ? (
                            <Avatar size={100} rounded>
                            <Image
                                source={{ uri: selectedImage }}
                                style={{ width: '100%', height: '100%', borderRadius: 100, resizeMode: 'cover', padding: 0, margin: 0 }}
                            />
                            </Avatar>
                        ) : (
                            <Text style={defaultStyles.errorMessageText}>No tiene imagen</Text>
                        )}
                        </View>
                        <View style={{marginTop:20}}>
                        <Button 
                        title="Crear Evento"
                        onPress={() =>handleSubmit()} />
                        </View>
                    </Card>
                </>   
                )} }
                </Formik>
                </Animated.View>

            </GestureHandlerRootView>
        </SafeAreaProvider>
       </>
    );
}
const styles = StyleSheet.create({
    input:{
        marginTop: 8,
        marginBottom: 0,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        borderColor:'gray', 
        borderWidth:0.5,
    },
})
export default CreateEvent;