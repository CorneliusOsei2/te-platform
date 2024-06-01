import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
}


export const DataProvider = ({ children }) => {

    const [dsa, setDsa] = useState([])
    const [workshopLessons, setWorkshopLessons] = useState([]);
    const [otherLessons, setOtherLessons] = useState([]);
    const [fetchLessons, setFetchLessons] = useState(true);

    return (
        <DataContext.Provider value={{
            fetchLessons,
            setFetchLessons,
            workshopLessons,
            setWorkshopLessons,
            otherLessons,
            setOtherLessons,
            setDsa,
            dsa
        }}>
            {children}
        </DataContext.Provider>
    );
}
