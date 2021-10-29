import React, { useState, useEffect, createRef } from 'react'
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { ButtonWithTitle, CardPayment, FoodCardInfo } from '../../components'
import { navigate } from '../../navigations/rootNavigations'
import { ApplicationState, ShoppingState, UserState, onUpdateCart, FoodModel, onCreateOrder, onApplyOffer } from '../../redux'
import { checkExistence } from '../../utils'
import { styles } from './css'
import PaymentTypePopup from 'react-native-raw-bottom-sheet'
import { Dimensions } from '../../constants'

interface CartProps {
    user: UserState
    shopping: ShoppingState
    onUpdateCart: Function
    onCreateOrder: Function
    onApplyOffer: Function
}

const _Cart: React.FC<CartProps> = (props) => {

    const [totalAmount, setTotalAmount] = useState(0)
    const [totalTax, setTotalTax] = useState(0)
    const [payableAmount, setPayableAmount] = useState(0)
    const [discount, setDiscount] = useState(0)

    const [isPayment, setIsPayment] = useState(false)

    const { Cart, user, location, appliedOffer } = props.user;   

    const popupRef = createRef<PaymentTypePopup>();

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetails', { food: item })
    } 
    
    useEffect(() => {
        onCaculateAmount()
    }, [Cart, appliedOffer])

    const onCaculateAmount = () => {
        let total = 0
        if(Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit
            })
        }

        const tax = (total / 100 * 0.9) + 40
        if(total > 0) {
            setTotalTax(tax)
        }

        setTotalAmount(total)
        setPayableAmount(total)
        setDiscount(0)

        if(appliedOffer._id !== undefined) {
            if(total >= appliedOffer.minValue) {
                const discount = (total / 100) * appliedOffer.offerPercentage
                setDiscount(discount)
                const afterDiscount = total - discount
                setPayableAmount(afterDiscount)
            } else {
                showAlert(
                    'This Offer is not applicable!',
                    `This Offer is applicable with minimum ${appliedOffer.minValue} only! Please select another Offer!`
                )
            }
        }
    }

    const showAlert = (title: string, msg: string) => {
        Alert.alert(
            title,
            msg,
            [
                {text: 'OK', onPress: () => props.onApplyOffer(appliedOffer, true)},

            ]
        )
    }

    const onValidateOrder = () => {
    
        // if(!user.verified) {
        //     navigate('Login', {})
        // } else {
        //     popupRef.current?.open()
        // }
        if(!user.token) { 
            navigate('Login', {})
        } else {
            popupRef.current?.open()
        }
    }

    const onTapPlaceOrder = () => {
        props.onCreateOrder(Cart, user)
        popupRef.current?.close()
        props.onApplyOffer(appliedOffer, true)
    }

    const onPaymentSuccess = (paymentResponse: string) => {

    }

    const onPaymentFailed = (failedResponse: string) => {

    }

    const onPaymentCancel = () => {

    }

    const popupView = () => {
        return (
            <PaymentTypePopup
                height={400}
                ref={popupRef}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent'
                    },
                    draggableIcon: {
                        backgroundColor: '#000'
                    },
                    container: {
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }
                }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    width: '100%',
                }}>
                    <View style={styles.paymentView}>
                        <Text style={{ fontSize: 20 }}>Payable Amount</Text>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>${payableAmount.toFixed()}</Text>
                    </View>

                    <View style={{
                        display: 'flex',
                        height: 100,
                        padding: 20,
                        flexDirection: 'row',
                        width: Dimensions.width - 40
                    }}>
                        <Image
                            source={require('../../images/delivery_icon.png')}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 5
                            }}>
                                Address Used to Delivery
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                color: '#666666',
                                marginBottom: 5
                            }}>
                                {location.Address.Label}
                            </Text>
                        </View>
                    </View>

                    <ScrollView horizontal={true}>
                        <View style={styles.paymentOptions}>
                            <TouchableOpacity
                                onPress={onTapPlaceOrder}
                                style={styles.options}
                            >
                                <Image
                                    source={require('../../images/cod_icon.png')}
                                    style={styles.icon}
                                />
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#545252'
                                }}>
                                    Cash On Delivery
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsPayment(true)}
                                style={styles.options}
                            >
                                <Image
                                    source={require('../../images/card_icon.png')}
                                    style={styles.icon}
                                />
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#545252'
                                }}>
                                    Card Payment
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </PaymentTypePopup>
        )
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <FoodCardInfo
                item={checkExistence(item, Cart)}
                onTap={onTapFood}
                onUpdateCart={props.onUpdateCart}
            />
        )
    }

    const footerContent = () => {
        return (
            <View style={{
                display: 'flex',
                flex: 1
            }}>
                <TouchableOpacity
                    style={[styles.row, { height: 80 }]}
                    onPress={() => navigate('Offer', {})}
                >
                    <View style={{
                        flex: 1,  
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#525252',
                            marginBottom: 10
                        }}>
                            Offers & Deals
                        </Text>
                        {appliedOffer._id !== undefined ? 
                            <View style={{

                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    fontWeight: '500',
                                    color: '#3D933F'        
                                }}>
                                    Applied {appliedOffer.offerPercentage}% of Discount
                                </Text>
                            </View>
                            :
                            <View>
                                <Text style={{
                                    color: '#EE6840',
                                    fontSize: 16
                                }}>
                                    You can apply available Offers. *TnC Apply
                                </Text>
                            </View>
                        }
                    </View>
                    <Image
                        source={require('../../images/arrow_icon.png')}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                <View style={[styles.row, { height: 250, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }]}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#525252',
                        marginBottom: 10
                    }}>
                        Bill Details
                    </Text>
                    <View style={styles.paymentInfo}>
                        <Text style={{
                            flex: 1,
                            fontSize: 14
                        }}>
                            Total
                        </Text>
                        <Text style={{
                            fontSize: 16
                        }}>
                            ${totalAmount.toFixed(0)}
                        </Text>
                    </View>
                    <View style={styles.paymentInfo}>
                        <Text style={{
                            flex: 1,
                            fontSize: 14
                        }}>
                            Tax & Delivery Charge
                        </Text>
                        <Text style={{
                            fontSize: 16
                        }}>
                            ${totalTax.toFixed(0)}
                        </Text>
                    </View>
                    {appliedOffer._id !== undefined &&
                        <View style={styles.paymentInfo}>
                            <Text style={{
                                flex: 1,
                                fontSize: 14
                            }}>
                                Discount (applied {appliedOffer.offerPercentage}%)
                            </Text>
                            <Text style={{
                                fontSize: 16
                            }}>
                                ${discount.toFixed(0)}
                            </Text>
                        </View>
                    }
                    <View style={styles.paymentInfo}>
                        <Text style={{
                            flex: 1,
                            fontSize: 14
                        }}>
                            Net Payable
                        </Text>
                        <Text style={{
                            fontSize: 16
                        }}>
                            ${payableAmount.toFixed(0)}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    const cartView = () => {
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
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600'
                        }}>
                            My Cart
                        </Text>
                        {user.token !== undefined &&
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',                               
                                }}
                                onPress={() => {
                                    navigate('Order', {})
                                }}
                            >
                                <Image
                                    source={require('../../images/orders.png')}
                                    style={{
                                        width: 50,
                                        height: 50
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={Cart}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={footerContent}
                    />
                </View>
                <View style={styles.footer}>
                    <View style={styles.accountView}>
                        <Text style={{ fontSize: 18 }}>Total</Text>
                        <Text style={{ fontSize: 18 }}>${payableAmount}</Text>
                    </View>
                    <ButtonWithTitle
                        title='Order Now'
                        onTap={onValidateOrder}
                        height={50}
                        width={320}
                    />
                </View>

                {popupView()}
            </View>
        )
    }
    
    if(Array.isArray(Cart) && Cart.length > 0) {
        if(isPayment) {
            return <CardPayment/>
        } else {
            return cartView()
        }
    } else {
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
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600'
                        }}>
                            My Cart
                        </Text>
                        {user.token !== undefined &&
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',                               
                                }}
                                onPress={() => {
                                    navigate('Order', {})
                                }}
                            >
                                <Image
                                    source={require('../../images/orders.png')}
                                    style={{
                                        width: 50,
                                        height: 50
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: '600'
                    }}>
                        Your Cart is Empty
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    shopping: state.shoppingReducer,
    user: state.userReducer
})

const Cart = connect(mapStateToProps, { onUpdateCart, onCreateOrder, onApplyOffer })(_Cart)

export { Cart }

