import React from 'react';
import { 
    View,
    TextInput,
} from 'react-native';
import defaultStyles from '../../config/styles/styles';

function AppTextInput({...otherProps}) {
    return (
        <View style={defaultStyles.inputTextContainer}>
            <TextInput 
            {...otherProps}
            style={defaultStyles.inputText}>{otherProps.selectedItemValue}</TextInput>
        </View>
    );
}
export default AppTextInput;
