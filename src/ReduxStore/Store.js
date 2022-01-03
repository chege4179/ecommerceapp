
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import UserReducer from "./UserStore/UserReducer";
import CartReducer from "./CartStore/CartReducer";

const middleware = [thunk];

const AppReducer = combineReducers({
    user:UserReducer,
    cart:CartReducer,
})

const store = createStore(AppReducer,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
