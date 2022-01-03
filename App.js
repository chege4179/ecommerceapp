/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React from 'react';
import { Text,View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/Home/HomeScreen";
import OrderScreen from "./src/screens/Orders/OrderScreen";
import AccountScreen from "./src/screens/Account/AccountScreen";
import WishListScreen from "./src/screens/WishList/WishlistScreen";
import CategoriesScreen from "./src/screens/Category/CategoriesScreen";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Provider } from "react-redux";
import store from "./src/ReduxStore/Store";

const TAB = createBottomTabNavigator()
const App = () => {
  return(
          <NavigationContainer>
              <Provider store={store}>
                  <TAB.Navigator tabBarOptions={{
                      labelStyle:{
                          fontSize:14.5,
                      },
                      style:{
                          height:55,
                      },
                      keyboardHidesTabBar:true
                  }}>
                      <TAB.Screen name='Home' component={HomeScreen}options={{
                          tabBarIcon:() => {
                              return(<Entypo name='home' size={30}/>)
                          },
                      }}/>
                      <TAB.Screen name='Categories'component={CategoriesScreen}options={{
                          tabBarIcon:() => {
                              return(<MaterialCommunityIcon color='black' name='receipt'size={30}/>)
                          }
                      }}/>
                      <TAB.Screen name='Wishlist'component={WishListScreen}options={{
                          tabBarIcon:() => {
                              return(<AntDesign name='hearto' size={30}/>)
                          }
                      }}/>
                      <TAB.Screen name='Orders' component={OrderScreen} options={{
                          tabBarIcon:() => {
                              return(<MaterialIcons name='receipt-long'size={30}/>)
                          },
                      }}/>
                      <TAB.Screen name='Account' component={AccountScreen}options={{
                          tabBarIcon:() => {
                              return(<MaterialIcons name='account-circle' size={30}/>)
                          }
                      }}/>
                  </TAB.Navigator>
              </Provider>
          </NavigationContainer>
  )
}
export default App
