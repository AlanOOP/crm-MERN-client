import { useContext, createContext, useState } from "react";

const CRMContext = createContext();

const CRMProvider = ({ children }) => {

    const [ auth, setAuth ] = useState({
        token: '',
        auth: false
    });
    
    
    return (
        <CRMContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </CRMContext.Provider>
    )
        
}

export{
    CRMProvider
}

export default CRMContext;