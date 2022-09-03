import { combineReducers } from "redux";

import locationListReducer from "./locationList";
import roomListReducer from "./roomList";
import roomDetailsReducer from "./roomDetails";
import authReducer from "./auth";
import userReducer from "./user";
import ticketReducer from "./ticket";

const rootReducer = combineReducers({
    locationList: locationListReducer,
    roomList: roomListReducer,
    roomDetails: roomDetailsReducer,
    ticket: ticketReducer,
    auth: authReducer,
    user: userReducer,
});

export default rootReducer;
