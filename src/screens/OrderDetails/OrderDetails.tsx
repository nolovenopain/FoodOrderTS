import moment from 'moment'
import React from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { ButtonWithIcon, ButtonWithTitle, FoodCard } from '../../components'
import { Dimensions } from '../../constants'
import { goBack } from '../../navigations/rootNavigations'
import { ApplicationState, OrderModel, UserState, onCancelOrder } from '../../redux'
import { styles } from './css'

interface OrderDetailsProps {
    user: UserState
    route: { params: { order: OrderModel } }
    onCancelOrder: Function
}

const _OrderDetails: React.FC<OrderDetailsProps> = (props) => {

    const { user } = props.user
    const order =  props.route.params.order 

    const onTapCancelOrder = () => {
        Alert.alert(
            'Do you wanna cancel this Order?',
            'Cancellation charge may applicable as per terms and conditions! \n We will send you cancellation confirmation soon',
            [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress:() => {
                    props.onCancelOrder(order, user)
                    goBack()
                }}
            ]
        )
    }

    const headerCart = () => {
        return (
            <View style={{
                padding: 10,
                alignItems: 'flex-start'
            }}>
                <Text style={styles.orderInfo}>
                    {moment(order.orderDate).format('Do MMM YY, h:mm a')}
                </Text>
                <Text style={styles.orderInfo}>
                    Order Amount: {order.totalAmount}
                </Text>
                <Text style={styles.orderInfo}>
                    Paid Through: {order.paidThrough}
                </Text>
                <Text style={styles.orderInfo}>
                    Status: {order.orderStatus}
                </Text>
            </View>
        )
    }

    const fooderCart = () => {
        if(order.orderStatus.toLowerCase() === 'cancelled') {
            return (
                <View style={{
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200
                }}>
                    <Text style={{
                        fontSize: 18,
                    }}>
                        Order is Cancelled with ID: XXX
                    </Text>
                </View>
            )
        } else {
            return(
                <>
                    <View style={{
                        display: 'flex',
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 300,
                        backgroundColor: '#C5C5C5'
                    }}>
                        <Text style={{
                            fontSize: 18,
                        }}>
                            Map view will go here...
                        </Text>
                    </View>
                    <View style={{
                        marginBottom: 10 
                    }}>
                        <ButtonWithTitle
                            title='Cancel Order'
                            onTap={onTapCancelOrder}
                            height={50}
                            width={Dimensions.width - 40}
                        />
                    </View>
                </>
            )
        }
    }

    const renderItem = ({item, index}: any) => {
        return (
            <FoodCard
                item={item.food}
                onTap={() => {}}
                onUpdateCart={() => {}}
                unit={item.unit}
            />
        )
    }

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
                        Order ID: {order.orderID}
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={order.items}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={headerCart()}
                    ListFooterComponent={fooderCart()}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer
})

const OrderDetails = connect(mapStateToProps, { onCancelOrder })(_OrderDetails)

export { OrderDetails }
