import React from 'react';
import AppTextInput from '../text-input/AppTextInput';
import AppErrorMessage from '../error-message/AppErrorMessage';
import { useFormikContext } from 'formik';
import { AppFormFieldProps } from '../../types/Types';
function AppFormField({name, ...otherProps}:AppFormFieldProps) {
    const {handleChange, setFieldTouched, errors, touched } = useFormikContext();
    const isVisible = Boolean((errors as { [key: string]: string })[name]);
    console.log(name)
    console.log(isVisible)
    return (
        <>
        <AppTextInput 
        clearButtonMode='always'
        placeholder={otherProps.placeholder} 
        {...otherProps}
        onChangeText={handleChange(name)}
        onBlur={()=>setFieldTouched(name)}
        />
        <AppErrorMessage error={(errors as { [key: string]: string })[name]} visible={!isVisible}  />
        
        </>
    );
}

export default AppFormField;