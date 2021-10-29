import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef();

export function navigate(
    screen: string, 
    params: any
) {
    if (navigationRef.isReady()) {
        navigationRef.current?.navigate(screen, params)
    }
}

export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.current?.goBack();
    }
}

export const replace = (
    name: string, 
    params: any
) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}