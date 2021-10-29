import React, { useEffect } from 'react'
import { View, Text, Alert, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ButtonWithIcon, OrderCard } from '../../components'
import { goBack } from '../../navigations/rootNavigations'
import { 
    ApplicationState,  
    UserState, 
    onGetOrder } from '../../redux'
import { styles } from './css'

interface OrderProps {
    user: UserState,
    onGetOrder: Function
}

const _Order: React.FC<OrderProps> = (props) => {

    const { user, orders } = props.user;   

    useEffect(() => {
        props.onGetOrder(user)
    }, [])

    const renderItem = ({item, index}: any) => {
        return (
            <OrderCard
                item={item}
                onTap={() => Alert.alert('Order Selected')}
            />
        )
    }
    
    if(Array.isArray(orders) && orders.length > 0) {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{
                        display: 'flex',
                        height: 60,
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 4,
                        paddingHorizontal: 20
                    }}>
                        <ButtonWithIcon
                            icon={require('../../images/back_arrow.png')}
                            onTap={() => goBack()}
                            width={32}
                            height={38}
                        />
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            marginLeft: 30
                        }}>
                            My Orders
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={orders}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.footer}>
                   
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{
                        display: 'flex',
                        height: 60,
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 4,
                        paddingHorizontal: 20
                    }}>
                        <ButtonWithIcon
                            icon={require('../../images/back_arrow.png')}
                            onTap={() => goBack()}
                            width={32}
                            height={38}
                        />
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            marginLeft: 30
                        }}>
                            My Orders
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: '600'
                    }}>
                        Your Orders is Empty
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer
})

const Order = connect(mapStateToProps, { onGetOrder })(_Order)

export { Order }

