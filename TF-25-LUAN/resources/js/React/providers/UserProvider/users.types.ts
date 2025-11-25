import { ListApi, UserModel } from "@app/js/app.types";

type ChangeUsersAction = {
    type: "changeUsers";
    payload?: UsersDataValue;
}

type SetCurrentPageAction = {
    type: "setCurrentPage";
    payload: number;
}

type SetLoadingAction = {
    type: "setLoading";
    payload: boolean;
}

type SetErrorAction = {
    type: "setError";
    payload: string | null;
}

export type UsersDataValue = ListApi<UserModel> | "error";

export type UsersProviderProps = {
    children: React.ReactNode
}

export type UsersContextValues = {
    state: UsersState
    changeData: (data?: UsersDataValue) => void;
    setCurrentPage: (page: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export type UsersState = {
    data?: UsersDataValue;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

export type UsersActions = 
    | ChangeUsersAction 
    | SetCurrentPageAction 
    | SetLoadingAction 
    | SetErrorAction;