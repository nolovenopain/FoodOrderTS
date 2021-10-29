import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert, Image } from 'react-native'
import { connect } from 'react-redux'
import { ButtonWithIcon, CategoryCard, SearchBar } from '../../components'
import { RestaurantCard } from '../../components/RestaurantCard'
import { navigate } from '../../navigations/rootNavigations'
import { 
    ApplicationState, 
    ShoppingState, 
    UserState, 
    onAvailability, 
    Restaurant, 
    Category, 
    FoodModel,
    onSearchFoods } from '../../redux'
import { styles } from './css'

interface HomeProps {
    user: UserState,
    shopping: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

const _Home: React.FC<HomeProps> = (props) => {

    const { location } = props.user
    const { availability } = props.shopping

    const { categories, foods, restaurants } = availability

    useEffect(() => {
        props.onAvailability('100000') // change 100000 to location.postalCode when have account google was charged
        setTimeout(() => {
            props.onSearchFoods('100000') // change 100000 to location.postalCode when have account google was charged
        }, 1000);
    }, [location])

    const didTouch = () => {
        navigate('SearchScreen', {})
    }

    const onTap = () => {

    }

    const renderCategory = ({ item, index }: any) => {
        return(
            <CategoryCard
                item={item}
                onTap={() => onTapCategory(item)}
                key={index}
            />
        )   
    }

    const onTapCategory = (item: Category) => {
        Alert.alert('category tap')
    }  
    
    const renderRestaurant = ({ item, index }: any) => {
        return(
            <RestaurantCard
                item={item}
                onTap={onTapRestaurant}
            />
        )   
    }

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantDetails', { restaurant: item })
    } 

    const renderFood = ({ item, index }: any) => {
        return(
            <RestaurantCard
                item={item}
                onTap={onTapFood}
            />
        )   
    }
    
    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetails', { food: item })
    } 

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={styles.addressWrapper}>
                    <Image
                        source={require('../../images/delivery_icon.png')}
                        style={{
                            width: 32,
                            height: 32
                        }}
                    />
                    <Text 
                        style={styles.address}
                        numberOfLines={1}
                    >
                        {location.Address.Label}
                    </Text>
                    <ButtonWithIcon
                        onTap={() => navigate('Location', {})}
                        icon={require('../../images/edit_icon.png')}
                        width={24}
                        height={24}
                    />
                </View>
                <View style={styles.searchBar}>
                    <SearchBar
                        didTouch={didTouch}
                        onTextChange={() => {}}
                    />
                    <ButtonWithIcon
                        onTap={onTap}
                        icon={require('../../images/hambar.png')}
                        width={55}
                        height={40}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <FlatList
                        contentContainerStyle={{ marginBottom: 10 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem={renderCategory}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View>
                        <Text 
                            style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: '#f15b5d',
                                marginLeft: 20
                            }}
                        >
                            Top Restaurant
                        </Text>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem={renderRestaurant}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View>
                        <Text 
                            style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: '#f15b5d',
                                marginLeft: 20
                            }}
                        >
                            30 Minutes Foods
                        </Text>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={foods}
                        renderItem={renderFood}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer,
    shopping: state.shoppingReducer
})

const Home = connect(mapStateToProps, { onAvailability, onSearchFoods })(_Home)

export { Home }