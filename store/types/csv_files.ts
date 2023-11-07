export interface CsvFile {
    fileId: string | null;
    fileName: string | null;
    uploadedAt: string | null;
    content: any | null;
}

export interface EnrichFileArgs {
  selectedColumn: string;
  apiResponseColumn: string;
  fileId: string;
  externalFile: any;
}

export type CsvFilesList = CsvFile[];
