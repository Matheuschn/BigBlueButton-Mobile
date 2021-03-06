import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParameters } from './types';
import Meeting from '../screens/Meeting';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Configuration from '../screens/Configuration';
import translate from '../services/translations';
import { Storage } from '../services/storage';
import { University } from '../services/storage/types';
import InputModal from '../components/InputModal';

const Stack = createStackNavigator<StackParameters>();

const Routes = () => {
    const [university, setUniversity] = useState<
        undefined | null | University
    >();

    useEffect(() => {
        Storage.getUniversity().then(setUniversity);
    }, []);

    // The promise hasn't returned yet, so we draw a blank screen
    // TODO: Create a loading screen
    if (university === undefined) {
        return <></>;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={university ? 'Login' : 'Configuration'}>
                <Stack.Screen
                    name={'Home'}
                    component={Home}
                    options={{
                        headerTitle: 'BigBlueButton Mobile',
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen
                    name={'Meeting'}
                    component={Meeting}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Login'}
                    component={Login}
                    initialParams={university ? { university } : {}}
                />
                <Stack.Screen
                    name={'Configuration'}
                    component={Configuration}
                    options={{ headerTitle: translate('configuration') }}
                />
                <Stack.Screen
                    name={'InputModal'}
                    component={InputModal}
                    options={{
                        presentation: 'transparentModal',
                        headerShown: false,
                        cardOverlayEnabled: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
