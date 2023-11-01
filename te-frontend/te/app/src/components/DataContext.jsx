import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
}


export const DataProvider = ({ children }) => {
    const [fetchReferralCompanies, setFetchReferralCompanies] = useState(true);
    const [referralCompanies, setReferralCompanies] = useState([]);

    return (
        <DataContext.Provider value={{ fetchReferralCompanies, setFetchReferralCompanies, referralCompanies, setReferralCompanies }}>
            {children}
        </DataContext.Provider>
    );
}
