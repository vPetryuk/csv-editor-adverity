import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {createLogger} from 'redux-logger';
import csvFilesReducer, {CSV_REDUCER_NAME} from './reducers/csv_files';


export const store = configureStore({
    reducer: {
        [CSV_REDUCER_NAME]: csvFilesReducer,
    },
    middleware: (getDefaultMiddleware: any) => {
        if (process.env.NODE_ENV === 'development') {
            return [...getDefaultMiddleware(), createLogger({collapsed: true})];
        }
        return [...getDefaultMiddleware()];
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
