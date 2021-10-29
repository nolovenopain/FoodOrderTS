import { Alert as AlertRN } from 'react-native';

let AlertCus = {
    Confirm: (
        callback: Function, 
        mess: string, 
        title: string, 
        cancelPress: Function, 
        textButtonCancel: string, 
        textButtonOK: string, 
        textAskMe: string, 
        askMePress: Function
    ) => {
        AlertRN.alert(
            title || 'Thông báo',
            mess || 'Bạn có muốn xóa?',
            (
                textAskMe != null ? 
                [
                    {
                        text: textAskMe || 'Nhắc tôi sau',
                        onPress: () => {
                            if (askMePress) askMePress();
                        }
                    }
                ] :
                    []
            ).concat([
                {
                    text: textButtonCancel || 'Hủy',
                    onPress: () => {
                        if (cancelPress) cancelPress();
                    },
                    // style: 'cancel',
                },
                {
                    text: textButtonOK || 'Đồng ý',
                    onPress: () => {
                        if (callback) callback();
                    }
                },
            ]),
            { cancelable: false },
        );
    },
    Alert: (
        title: string, 
        mess: string, 
        callback: Function
    ) => {
        AlertRN.alert(
            title || 'Thông báo',
            mess ? mess : 'Có lỗi xẩy ra, vui lòng thử lại.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        if (callback) callback();
                    }
                },
            ],
            { cancelable: false }
        );
    }
}

export default AlertCus;