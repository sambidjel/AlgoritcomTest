import React, {useState, useEffect, useRef} from 'react';
import { 
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
import {launchImageLibrary,} from 'react-native-image-picker';
import { Formik} from "formik";
import * as Yup from "yup";
import Drawer from '../components/drawer/Drawer';
import Header from '../components/header/Header';
import { Event } from '../types/Types';
import { useEventContext } from '../static-data/eventLists/EventContext';
import AppTextInput from '../components/text-input/AppTextInput';
import AppErrorMessage from '../components/error-message/AppErrorMessage';
import defaultStyles from '../config/styles/styles';
const validationSchema=Yup.object().shape({
    eventName:Yup.string().required().label('Nombre de evento'),
    eventDescription:Yup.string().required().label('Descripcion de evento'),
    eventDate:Yup.string().required().label('Fecha de evento'),
    image:Yup.string().required().label('Subir imagen') 
});
function EditEvent({...props}) {
    const propsFormatted = Object.assign({}, props);
    const selectedItem = propsFormatted.route.params.selectedItem;
    const formikRef = useRef(null);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const active = useSharedValue<boolean>(false);
    const [selectedImage, setSelectedImage]=useState()
    const drawerWidth = useSharedValue<number>(1000);
    const darawerTranslateX = useSharedValue<number>(-drawerWidth.value);
   
    useEffect(() => {
        if (selectedItem?.eventDate) {
            try {
                const [day, month, year] = selectedItem.eventDate.split('/');
                const selectedDate = new Date(`${year}-${month}-${day}`);
                if (!isNaN(selectedDate.getTime())) {
                    setDate(selectedDate);
                    (formikRef.current as any)?.setValues({
                        eventName: selectedItem?.eventName,
                        eventDescription: selectedItem?.eventDescription,
                        eventDate: selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                        image: selectedItem?.image,
                    });
                    setSelectedImage(selectedItem?.image);
                } else {
                    console.error("Invalid date format:", selectedItem.eventDate);
                }
            } catch (error) {
                console.error("Error parsing date:", error);
            }
        }
      }, []);
    const { editEvent } = useEventContext();
    const handleAddEvent = (newEvent: Event) => { 
        editEvent(newEvent.id, newEvent);
        (formikRef.current as any)?.resetForm();
        Alert.alert(
            'Evento Actualizado',
            `Evento ${newEvent.eventName} ha sido actualizado con exito`,
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
                    const updatedEvent={
                        id:selectedItem.id,
                        ...values,
                    }
                    handleAddEvent(updatedEvent as Event)
                }}
                validationSchema={validationSchema}
                innerRef={(formik) => {
                    // Save the Formik ref
                    (formikRef.current as any) = formik;
                }}
                >
                 {({handleChange, handleSubmit, setFieldValue, errors, setFieldTouched, touched})=>(
                <>
                    <Card containerStyle={{ marginTop: 15,}}>
                        <Card.Title>Editar Evento </Card.Title>
                        <Card.Divider />

                        <AppTextInput 
                        placeholder='Nombre de evento' 
                        onChangeText={handleChange('eventName')}
                        onBlur={()=>setFieldTouched('eventName')}
                        selectedItemValue={selectedItem.eventName}
                        clearButtonMode='always' />
                        <AppErrorMessage error={errors.eventName} visible={!!errors.eventName} />
                        
                        <AppTextInput 
                        placeholder='Descripcion de evento' 
                        onChangeText={handleChange('eventDescription')}
                        selectedItemValue={selectedItem.eventDescription}
                        onBlur={()=>setFieldTouched('eventDescription')}
                        clearButtonMode='always' />
                        <AppErrorMessage error={errors.eventDescription} visible={!!errors.eventDescription}  />
                        
                   
                        <TouchableOpacity
                        onPress={() => setOpen(true)}
                        >
                           <TextInput 
                            clearButtonMode='always'
                            readOnly
                            style={defaultStyles.inputText}
                            onChangeText={handleChange("eventDate")}
                            placeholder='Fecha de evento'>Fecha de evento:  {date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) }</TextInput>
                             <AppErrorMessage error={errors.eventDate} visible={!!errors.eventDate}  />
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
                        title="Guardar Cambios"
                        onPress={() =>handleSubmit()} />
                        </View>
                    </Card>
                </>   
                )} 
                </Formik>

                </Animated.View>

            </GestureHandlerRootView>
        </SafeAreaProvider>
       </>
    );
}

export default EditEvent;