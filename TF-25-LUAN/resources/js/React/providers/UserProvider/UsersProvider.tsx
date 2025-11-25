import React, { useMemo, useReducer } from "react";
import { UsersContextValues, UsersProviderProps, UsersDataValue } from "./users.types";
import { usersReducer } from "./usersReducer";
import UsersContext from "./UsersContext";

export default function UsersProvider({ children }: UsersProviderProps) {

    const [state, dispatch] = useReducer(usersReducer, {
        data: undefined,
        currentPage: 1,
        loading: false,
        error: null
    });

    const api = useMemo<UsersContextValues>(() => ({
        state: state,
        changeData: (data?: UsersDataValue) => dispatch({ type: "changeUsers", payload: data }),
        setCurrentPage: (page: number) => dispatch({ type: "setCurrentPage", payload: page }),
        setLoading: (loading: boolean) => dispatch({ type: "setLoading", payload: loading }),
        setError: (error: string | null) => dispatch({ type: "setError", payload: error })
    }), [state]);

    return <UsersContext.Provider value={api}>{children}</UsersContext.Provider>;

}