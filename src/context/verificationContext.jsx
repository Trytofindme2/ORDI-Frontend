import { createContext, useReducer } from "react";

const VerificationContext = createContext();

const initialState = {
    email : null,
    password : null
}

const VerificationReducer = (state,action) => {
    switch (action.type) {
        case'sign-up':
            return { ... state , email : action.payload.email , password : action.payload.password}
        default:
            return state;
    }
}

const VerificationContextProvider = ({children}) => {

    const [state,dispatch] = useReducer(VerificationReducer, initialState);
    return(
        <VerificationContext.Provider value={{email : state.email , password : state.password , dispatch }}>
            {children}
        </VerificationContext.Provider>
    )
}

export { VerificationContext , VerificationContextProvider}
