import React from 'react';
import AppText from '../text/AppText';
import defaultStyles from '../../config/styles/styles';
import { AppErrorMessageProps } from '../../types/Types';
function AppErrorMessage({error, visible}:AppErrorMessageProps) {
    if(!visible || !error)return null;
    return (
        <AppText style={defaultStyles.errorMessageText}>{error}</AppText>
    );
}

export default AppErrorMessage;