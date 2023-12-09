import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
}


export const DataProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);
    const [fetchApplications, setFetchApplications] = useState(true);

    const [fetchReferralCompanies, setFetchReferralCompanies] = useState(true);
    const [referralCompanies, setReferralCompanies] = useState([]);

    const [fetchFiles, setFetchFiles] = useState(true);
    const [resumes, setResumes] = useState([]);
    const [otherFiles, setOtherFiles] = useState([]);

    const [fetchEssay, setFetchEssay] = useState(true);
    const [essay, setEssay] = useState([]);

    const [fetchCompanies, setFetchCompanies] = useState(true);
    const [companies, setCompanies] = useState(["Microsoft", "Google", "Meta"]);


    return (
        <DataContext.Provider value={{
            fetchCompanies,
            setFetchCompanies,
            companies,
            setCompanies,
            fetchApplications,
            setFetchApplications,
            applications,
            setApplications,
            fetchReferralCompanies,
            setFetchReferralCompanies,
            referralCompanies,
            setReferralCompanies,
            fetchFiles,
            setFetchFiles,
            resumes,
            setResumes,
            otherFiles,
            setOtherFiles,
            fetchEssay,
            setFetchEssay,
            essay,
            setEssay
        }}>
            {children}
        </DataContext.Provider>
    );
}
