import { configureStore, combineReducers, AnyAction, Reducer } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coachesReducer from "../features/coaches/coachesSlice";
import managersReducer from "../features/managers/managersSlice";
import userDetailReducer from "../features/user/userDetail/userDetailSlice";
import { idpApi } from "../api/idpApi";
import { getCookie } from "../utils/cookie";

// Combine the reducers so that they can be wrapped in a root reducer.
// Having a root reducer allows us to clear the store when a user logs out.
const combinedReducer = combineReducers({
  [idpApi.reducerPath]: idpApi.reducer,
  auth: authReducer,
  coaches: coachesReducer,
  managers: managersReducer,
  userDetail: userDetailReducer,
});

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

// preload store
const preloadedState = {
  auth: {
    token: getCookie("token"),
  },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(idpApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
