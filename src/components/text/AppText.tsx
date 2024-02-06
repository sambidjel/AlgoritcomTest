import React from 'react';
import { 
    View,
    Text,
} from 'react-native';
import defaultStyles from '../../config/styles/styles';
function AppText({...otherProps}) {
    return (
        <View style={defaultStyles.inputTextContainer}>
            <Text 
            {...otherProps} />
        </View>
    );
}

export default AppText;