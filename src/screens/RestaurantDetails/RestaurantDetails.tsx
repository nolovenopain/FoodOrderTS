import React from 'react'
import { FlatList, ImageBackground, Text, View } from 'react-native'
import { connect } from 'react-redux';
import { ButtonWithIcon, FoodCard } from '../../components';
import { goBack, navigate } from '../../navigations/rootNavigations';
import { ApplicationState, FoodModel, Restaurant, onUpdateCart, UserState } from '../../redux';
import { checkExistence } from '../../utils';
import { styles } from './css';

interface RestaurantProps {
    route: { params: { restaurant: Restaurant } },
    user: UserState,
    onUpdateCart: Function
}

const _RestaurantDetails: React.FC<RestaurantProps> = (props) => {

    const restaurant =  props.route.params.restaurant 

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetails', { food: item })
    }

    const { Cart } = props.user

    const renderItem = ({ item, index }: any) => {
        return (
            <FoodCard
                item={checkExistence(item, Cart)}
                onTap={onTapFood}
                onUpdateCart={props.onUpdateCart}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <ButtonWithIcon
                    icon={require('../../images/back_arrow.png')}
                    onTap={() => goBack()}
                    width={42}
                    height={42}
                />
                <Text style={styles.title} >
                    {restaurant.name}
                </Text>
            </View>     
            <View style={styles.body}>
                <ImageBackground
                    source={{ uri: restaurant.images[0] }}
                    style={styles.image}
                >
                    <View style={styles.nameWrapper} >
                        <Text style={styles.name} >
                            {restaurant.name}
                        </Text>
                        <Text style={styles.address} >
                            {restaurant.address} {restaurant.phone}
                        </Text>
                    </View>
                </ImageBackground>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={restaurant.foods}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>  
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    shopping: state.shoppingReducer,
    user: state.userReducer
})

const RestaurantDetails = connect(mapStateToProps, { onUpdateCart })(_RestaurantDetails)

export { RestaurantDetails }

