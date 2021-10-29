import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import { ButtonWithIcon, FoodCard, SearchBar } from '../../components'
import { Dimensions } from '../../constants'
import { goBack, navigate } from '../../navigations/rootNavigations'
import { ApplicationState, FoodModel, ShoppingState, onUpdateCart, UserState } from '../../redux'
import { checkExistence } from '../../utils'
import { styles } from './css'

interface SearchScreenProps {
    shopping: ShoppingState,
    user: UserState,
    onUpdateCart: Function
}

const _SearchScreen: React.FC<SearchScreenProps> = (props) => {

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState('')

    const { availableFoods } = props.shopping
    const { Cart } = props.user

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetails', { food: item })
    } 

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
                <View style={{ 
                    display: 'flex', 
                    height: 60, 
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: Dimensions.width
                }}>
                    <ButtonWithIcon
                        icon={require('../../images/back_arrow.png')}
                        width={40}
                        height={50}
                        onTap={() => goBack()}
                    />
                    <SearchBar
                        onTextChange={setKeyword}
                        onEndEditing={() => setIsEditing(false)}
                        didTouch={() => setIsEditing(true)}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={
                        isEditing
                        ?
                        availableFoods.filter(e => {
                            return e.name.includes(keyword)
                        })
                        : availableFoods
                    }
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

const SearchScreen = connect(mapStateToProps, { onUpdateCart })(_SearchScreen)

export { SearchScreen }
