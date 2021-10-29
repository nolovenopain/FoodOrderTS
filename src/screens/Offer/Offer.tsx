import React, { useEffect } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { OfferCard } from '../../components'
import { 
    ApplicationState, 
    ShoppingState, 
    UserState, 
    onGetOffers, 
    OfferModel,
    onApplyOffer } from '../../redux'
import { styles } from './css'

interface OfferProps {
    shopping: ShoppingState
    user: UserState
    onGetOffers: Function
    onApplyOffer: Function
}

const _Offer: React.FC<OfferProps> = ({
    user,
    shopping,
    onGetOffers,
    onApplyOffer
}) => {

    const { location, Cart, appliedOffer } = user
    const { offers } = shopping

    useEffect(() => {
        onGetOffers(10000)
    }, [])

    const onTapApplyOffer = (offer: OfferModel) => {
        let total = 0
        if(Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit
            })
        }
        const taxAmount = (total / 100 * 0.9) + 40
        const orderAmount = taxAmount + total
        if(orderAmount >= offer.minValue) {
            onApplyOffer(offer, false)
            showAlert(
                'Offer Applied',
                `Offer Applied with discount of ${offer.offerPercentage}%`
            )
        } else {
            showAlert(
                'This Offer is not applicable!',
                `This Offer is applicable with minimum order amount ${offer.minValue} only`
            )
        }
    }

    const showAlert = (title: string, msg: string) => {
        Alert.alert(
            title,
            msg,
            [
                {text: 'OK', onPress: () => {}},

            ]
        )
    }

    const onTapRemoveOffer = (item: OfferModel) => {
        onApplyOffer(item, true)
    }

    const checkIfExist = (offer: OfferModel) => {
        if(appliedOffer._id !== undefined) {
            return offer._id.toString() === appliedOffer._id.toString()
        }
        return false
    }

    const renderItem = ({item, index}: any) => {
        return (
            <OfferCard
                item={item} 
                onTapApply={onTapApplyOffer} 
                onTapRemove={onTapRemoveOffer} 
                isApplied={checkIfExist(item)}            
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
                    {/* <ButtonWithIcon
                        icon={require('../../images/back_arrow.png')}
                        onTap={() => goBack()}
                        width={32}
                        height={38}
                    /> */}
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '600',
                        marginLeft: 30
                    }}>
                        Offers & Deals
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                {Array.isArray(offers) &&
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={offers}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    shopping: state.shoppingReducer,
    user: state.userReducer
})

const Offer = connect(mapStateToProps, { onGetOffers, onApplyOffer })(_Offer)

export { Offer }
