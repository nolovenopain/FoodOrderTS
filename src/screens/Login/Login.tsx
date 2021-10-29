import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { ButtonWithTitle, TextField } from '../../components'
import { Dimensions } from '../../constants'
import { navigate } from '../../navigations/rootNavigations'
import { ApplicationState, UserState, onUserLogin, onUserSignup, onOTPRequest, onVerifyOTP } from '../../redux'
import { styles } from './css'

interface LoginProps {
    onUserSignup: Function
    onUserLogin: Function
    userObj: UserState
    onOTPRequest: Function
    onVerifyOTP: Function
}

const _Login: React.FC<LoginProps> = ({
    onUserSignup,
    onUserLogin,
    onOTPRequest, 
    onVerifyOTP,
    userObj
}) => { 

    const { user } = userObj

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('Login')
    const [isSignup, setIsSignup] = useState(false)
    const [otp, setOtp] = useState('')
    const [verified, setVerified] = useState(true)
    const [requestOtpTitle, setRequestOtpTitle] = useState('Request a new OTP in')
    const [canRequestOtp, setCanRequestOtp] = useState(true)

    let countDown: any

    useEffect(() => {
        // if(user.verified !== undefined) {
        //     if(user.verified === true) {
        //         navigate('Cart', {})
        //     } else {
        //         setVerified(user.verified)
        //         onEnableOtpRequest()
        //     }
        // }
        if(user.token !== undefined) {
            navigate('Cart', {})
        }
        return () => {
            clearInterval(countDown)
        }
    }, [user])

    const onTapOption = () => {
        setIsSignup(!isSignup)
        setTitle(!isSignup ? 'Signup' : 'Login')
    }

    const onTapAuthenticate = () => {
        if(isSignup) {
            onUserSignup(email, phone, password)
        } else {
            onUserLogin(email, password)
        }
    }

    const onEnableOtpRequest = () => {
        const otpDate = new Date()
        otpDate.setTime(new Date().getTime() + (2 * 60 * 1000))
        const otpTime = otpDate.getTime()

        countDown = setInterval(function() {
            const currentTime = new Date().getTime()
            const totalTime = otpTime - currentTime
            let minutes = Math.floor(totalTime % (1000 * 60 * 60) / (1000 * 60))
            let seconds = Math.floor(totalTime % (1000 * 60) / 1000)

            setRequestOtpTitle(`Request a new OTP in ${minutes} : ${seconds}`)

            if(minutes < 1 && seconds < 1) {
                setRequestOtpTitle('Request a new OTP')
                setCanRequestOtp(true)
                clearInterval(countDown)
            }
        }, 1000) 
    }

    const onTapVerify = () => {
        onVerifyOTP(otp, user)
    }

    const onTapRequestNewOTP = () => {
        setCanRequestOtp(false)
        onOTPRequest(user)
    }

    if(!verified) {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Image
                        source={require('../../images/verify_otp.png')}
                        style={{
                            width: 120,
                            height: 120,
                            margin: 20
                        }}
                    />
                    <Text style={{
                        fontSize: 22,
                        fontWeight: '500',
                        margin: 20
                    }}>
                        Verification
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        padding: 10,
                        marginBottom: 20,
                        color: '#716F6F'
                    }}>
                        Enter your OTP sent your mobile number
                    </Text>
                    <TextField
                        isOTP={true}
                        placeholder='OTP'
                        onTextChange={() => {}}
                        isSecure={true}
                    />
                    <ButtonWithTitle
                        title='Verify OTP'
                        onTap={onTapVerify}
                        width={Dimensions.width - 50}
                        height={50}
                    />
                    <ButtonWithTitle
                        title={requestOtpTitle}
                        onTap={onTapRequestNewOTP}
                        width={Dimensions.width - 50}
                        height={50}
                        isNoBg={true}
                        disable={canRequestOtp}
                    />
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Text style={{ fontSize: 30 }}>{title}</Text>
                </View>
                <View style={styles.body}>
                    <TextField
                        placeholder='Email'
                        onTextChange={setEmail}
                        keyboardType='email-address'
                    />
                    {isSignup &&
                        <TextField
                            placeholder='Phone'
                            onTextChange={setPhone}
                            keyboardType='phone-pad'
                        />
                    }
                    <TextField
                        placeholder='Password'
                        onTextChange={setPassword}
                        isSecure={true}
                    />
                    <ButtonWithTitle
                        title={title}
                        onTap={onTapAuthenticate}
                        width={Dimensions.width - 50}
                        height={50}
                    />
                    <ButtonWithTitle
                        title={!isSignup ? 'No Account? Signup Here' : 'Have an Account? Login Here'}
                        onTap={onTapOption}
                        width={Dimensions.width - 50}
                        height={50}
                        isNoBg={true}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    userObj: state.userReducer
})

const Login = connect(mapStateToProps, { onUserLogin, onUserSignup, onOTPRequest, onVerifyOTP })(_Login)

export { Login }