import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { navigate } from '../../navigations/rootNavigations'
import { ApplicationState, UserState, onUserLogout } from '../../redux'
import { Login } from '../Login/Login'
import { styles } from './css'

interface AccountProps {
    user: UserState
    onUserLogout: Function
}

const _Account: React.FC<AccountProps> = (props) => {

    const { user } = props.user

    const options = [
        {
            title: 'Edit profile',
            action: () => {}
        },
        {
            title: 'View Orders',
            action: () => navigate('Order', {})
        },
        {
            title: 'Contact Support',
            action: () => {}
        },
        {
            title: 'Logout',
            action: () => props.onUserLogout()
        },
    ]

    const optionCard = (title: string, action: Function) => {
        return (
            <TouchableOpacity
                key={title}
                onPress={() => action()}
                style={{
                    backgroundColor: '#fff',
                    height: 80,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    paddingLeft: 50,
                    paddingRight: 20,
                    borderColor: '#D3D3D3',
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5 
                }}
            >
                <Text style={{
                    flex: 1,
                    fontSize: 18,
                    color: '#525252'
                }}>
                    {title}
                </Text>
                <Image
                    source={require('../../images/arrow_icon.png')}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            </TouchableOpacity>
        )
    }

    if(user.token !== undefined) {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{
                        display: 'flex',
                        height: 60,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 4,
                        paddingHorizontal: 20
                    }}>
                        <Image
                            source={require('../../images/avatar.png')}
                            style={{
                                width: 150,
                                height: 150,
                                marginRight: 20
                            }}
                        />
                        <View>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: '600'
                            }}>
                                {user.firstName || 'Guest'}
                            </Text>
                            <Text style={{
                                fontSize: 18
                            }}>
                                {user.email}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <ScrollView>
                        {options.map(({title, action}) => {
                            return optionCard(title, action)
                        })} 
                    </ScrollView>
                </View>
            </View>
        )
    } else {
        return (
            <Login/>
        )
    }
    
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer
})

const Account = connect(mapStateToProps, { onUserLogout })(_Account)

export { Account }

