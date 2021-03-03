import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopRestaurantsStack from './TopRestaurantsStack';
import SearchStack from './SearchStack';
import RestaurantsStack from './RestaurantsStack';
import AccountStack from './AccountStack';
import FavoritesStack from './FavoritesStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="restaurants"
                    component={RestaurantsStack}
                    options={{ title: "Restaurantes" }}
                />
                <Tab.Screen
                    name="favorites"
                    component={FavoritesStack}
                    options={{ title: "Favoritos" }}

                />
                <Tab.Screen
                    name="top-restaurants"
                    component={TopRestaurantsStack}
                    options={{ title: "Top 5" }}

                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{ title: "Buscar" }}

                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{ title: "Cuenta" }}

                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}