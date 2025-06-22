import { createContext, useContext } from "react";
import { useConfig } from "./hooks/use-config";

const AuthContext = createContext(null);

export function useAuthContext() {
    const Authstatus =  useContext(AuthContext);
    if(!Authstatus){
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return Authstatus;
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const allauthconfig = useConfig();
    if (allauthconfig.isPending){
        return <div>Loading...</div>;
    }
    if (allauthconfig.isError){
        return <div>Error: {allauthconfig.error.message}</div>;
    }
    console.log(allauthconfig.data);
    return (
    <AuthContext.Provider value={{config: allauthconfig.data}}>
        {children}
    </AuthContext.Provider>
    )
}

