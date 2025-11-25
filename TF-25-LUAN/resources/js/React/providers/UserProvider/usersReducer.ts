import { UsersActions, UsersState } from "./users.types";

const initialState: UsersState = {
    data: undefined,
    currentPage: 1,
    loading: false,
    error: null
};

export function usersReducer(
    state: UsersState = initialState,
    action: UsersActions
): UsersState {
    switch (action.type) {
        case "changeUsers":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };
        
        case "setCurrentPage":
            return {
                ...state,
                currentPage: action.payload
            };
        
        case "setLoading":
            return {
                ...state,
                loading: action.payload
            };
        
        case "setError":
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        
        default:
            return state;
    }
}