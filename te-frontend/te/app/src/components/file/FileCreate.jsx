import { useCallback, useEffect, useState } from "react";
import Essay from "./Essay";
import { DocumentIcon } from '@heroicons/react/20/solid'
import axiosInstance from "../../axiosConfig";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import SlideOverForm from "../custom/SlideOver/SlideOverCreate";
import { FileUpload, FormSelect } from "../custom/FormInputs";
import { setNestedPropertyValue } from "../../utils";
import SuccessFeedback from "../custom/Alert/SuccessFeedback";
import { Loading } from "../custom/Loading";


const FileCreate = ({ setFileUpload }) => {
    const { accessToken } = useAuth();

    const [status, setStatus] = useState(null);
    const [fileData, setFileData] = useState({ type: "", file: null })
    const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);

    const uploadFileRequest = async () => {
        const formData = new FormData();
        formData.append('title', fileData.file.name);
        formData.append('type', fileData.type);
        formData.append('file', fileData.file);

        setStatus("Loading...")

        axiosInstance.post("/learning.file.upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((_) => {
            setShowSuccessFeedback(true);
            setStatus(null);
        }
        ).catch((error) => {
            console.log(error);
            setStatus(null);
        })
    }

    const handleInputChange = ({ field, value }) => {
        setFileData((prevFileData) =>
            setNestedPropertyValue({ ...prevFileData }, field, value)
        );
    };

    const handleFileUploadChange = async (event) => {
        handleInputChange({ field: "file", value: event.target.files[0] });
    };

    return (
        <>
            <SlideOverForm
                title={"Upload New  File"}
                setHandler={setFileUpload}
                requestHandler={uploadFileRequest}
                children={
                    <div className="px-3 mt-6">

                        {showSuccessFeedback &&
                            <SuccessFeedback
                                message={"Resume successfully added."}
                                setShowSuccessFeedback={setShowSuccessFeedback}
                            />
                        }

                        {
                            status === "Loading..." ? <Loading /> :
                                <>
                                    <FormSelect
                                        field={"type"}
                                        label={"Type"}
                                        data={["Resume", "Other files (eg: cover letter)"]}
                                        handleInputChange={handleInputChange}
                                    />

                                    <FileUpload handleFileUploadChange={handleFileUploadChange} required={true} />
                                </>
                        }
                    </div>
                }
            />
        </>
    )
}

export default FileCreate;