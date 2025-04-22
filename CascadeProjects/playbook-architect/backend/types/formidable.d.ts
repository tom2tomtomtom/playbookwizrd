declare module 'formidable' {
  export interface File {
    filepath: string;
    originalFilename?: string;
    mimetype?: string;
    size?: number;
    toBuffer?: () => Promise<Buffer>;
  }
  export interface Fields {
    [key: string]: string | string[];
  }
  export interface Files {
    [key: string]: File | File[];
  }
}

