export type File = {
  id: string;
  name: string;
  type: 'file';
  content: string;
  input: string;
  output: string;
  language?: string;
  createdAt: string;
  updatedAt: string;
}

export type Folder = {
  id: string;
  name: string;
  type: 'folder';
  children: FileNode[];
}

export type FileNode = 
  | File
  | Folder;
