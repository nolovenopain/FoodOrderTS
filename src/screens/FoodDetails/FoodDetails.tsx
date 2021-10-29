import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { connect } from 'react-redux';
import { ButtonWithIcon, FoodCard } from '../../components';
import { goBack, navigate } from '../../navigations/rootNavigations';
import { ApplicationState, FoodModel, onUpdateCart, UserState } from '../../redux';
import { checkExistence } from '../../utils';
import { styles } from './css';

interface FoodDetailsProps {
    route: { params: { food: FoodModel } }
    user: UserState
    onUpdateCart: Function
}

const _FoodDetails: React.FC<FoodDetailsProps> = (props) => {

    const food =  props.route.params.food 

    const { Cart } = props.user

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
                    {food.name}
                </Text>
            </View>     
            <View style={styles.body}>
                <ImageBackground
                    source={{ uri: food.images[0] }}
                    style={styles.image}
                >
                    <View style={styles.nameWrapper} >
                        <Text style={styles.name} >
                            {food.name}
                        </Text>
                        <Text style={styles.address} >
                            {food.category}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={{ display: 'flex', height: 300, padding: 20 }}>
                    <Text>Food will be ready within {food.readyTime} Miniute(s)</Text>
                    <Text>{food.description}</Text>
                </View>
                <View style={{ height: 120 }}>
                    <FoodCard 
                        item={checkExistence(food, Cart)} 
                        onTap={() => {}}
                        onUpdateCart={props.onUpdateCart}
                    />
                </View>
            </View> 
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    shopping: state.shoppingReducer,
    user: state.userReducer
})

const FoodDetails = connect(mapStateToProps, { onUpdateCart })(_FoodDetails)

export { FoodDetails }
