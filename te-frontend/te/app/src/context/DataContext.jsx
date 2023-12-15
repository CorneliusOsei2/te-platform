import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
}


export const DataProvider = ({ children }) => {
    const [workshopLessons, setWorkshopLessons] = useState([]);
    const [otherLessons, setOtherLessons] = useState([]);
    const [fetchLessons, setFetchLessons] = useState(true);

    const [applications, setApplications] = useState([]);
    const [fetchApplications, setFetchApplications] = useState(true);

    const [fetchReferralCompanies, setFetchReferralCompanies] = useState(true);
    const [referralCompanies, setReferralCompanies] = useState([]);

    const [fetchFiles, setFetchFiles] = useState(true);
    const [resumes, setResumes] = useState([]);
    const [otherFiles, setOtherFiles] = useState([]);

    const [fetchEssay, setFetchEssay] = useState(true);
    const [essay, setEssay] = useState([]);

    const [contact, setContact] = useState("");

    const [fetchCompanies, setFetchCompanies] = useState(true);
    const [companies, setCompanies] = useState(["Microsoft", "Google", "Meta"]);


    return (
        <DataContext.Provider value={{
            fetchLessons,
            setFetchLessons,
            workshopLessons,
            setWorkshopLessons,
            otherLessons,
            setOtherLessons,
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
            setEssay,
            contact,
            setContact
        }}>
            {children}
        </DataContext.Provider>
    );
}
