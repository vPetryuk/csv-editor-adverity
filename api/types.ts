export enum API_METHODS {
    GET = 'GET',
    POST = 'POST',
    POST_FORM_DATA = 'POST_FORM_DATA',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type ApiRequestPayload = {
    url: string;
    method: keyof typeof API_METHODS;
    params?: URLSearchParams | string;
    body?: Record<string, any> | string;
};

export const API_URLS = {
    csv_files: 'csv_files/',
    retrieve: 'retrieve_csv_file/',
    csv_create: 'csv_create/',
    upload: 'csv_files/upload/',
    enrich: 'csv_files/enrich/',
};

export interface CsvFile {
    fileId: string | null;
    fileName: string | null;
    uploadedAt: string | null;
    content: string | null;
}

export type CsvFilesList = CsvFile[];
