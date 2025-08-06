import { createContext } from "react";

const receipeContext = createContext();


const receipeContextProvider = ({children}) => {
    <receipeContext.Provider>
        {children}
    </receipeContext.Provider>
}

export default { receipeContext , receipeContextProvider}