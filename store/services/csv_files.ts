import {apiRequest} from '../../api';
import {API_METHODS, API_URLS} from '../../api/types';


const fetchAllCsvFiles = () => {
    return apiRequest({
        method: API_METHODS.GET,
        url: API_URLS.csv_files,
    });
};

const fetchSingleCsvFile = (postId: number | string) => {
    return apiRequest({
        method: API_METHODS.GET,
        url: `${API_URLS.csv_files}${postId}/${API_URLS.retrieve}`,
    });
};

const uploadFile = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiRequest({
        method: API_METHODS.POST_FORM_DATA,
        url: API_URLS.upload,
        body: formData,
    });
}

const fetchExternalFile = (apiLink: string) => {
    return apiRequest({
        method: API_METHODS.GET,
        url: apiLink,
    });
}

const enrichFile = (selectedColumn: string, apiResponseColumn: string, fileId: string, externalFile: any) => {
    const formData = new FormData();
    formData.append('file', JSON.stringify(externalFile));
    formData.append('selectedColumn', selectedColumn);
    formData.append('apiResponseColumn', apiResponseColumn);
    formData.append('fileId', fileId);
    return apiRequest({
        url: API_URLS.enrich,
        method: API_METHODS.POST_FORM_DATA,
        body: formData,
    });
}


// const createLinkedInPost = (userId: number, postId: string | number, to_be_sent_at: string) => {
//   const params = new URLSearchParams({
//     user_id: String(userId),
//     post_id: String(postId),
//     to_be_sent_at,
//   });
//   return apiRequest({
//     url: API_URLS.csv_create,
//     method: API_METHODS.POST,
//     params,
//   });
// };

export const csvServices = {
    fetchAllCsvFiles,
    fetchSingleCsvFile,
    uploadFile,
    fetchExternalFile,
    enrichFile,
};
