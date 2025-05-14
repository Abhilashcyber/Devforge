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

export type Question = {
  question_id: string,
  question_heading: string,
  question_difficulty: string,
  description: string,
  exampleList: Array<{
      input: any,
      output: any,
      explanation: string
  }>,
  constraints: Array<string>,
  starter_code: string,
  test_cases: Array<{
      input: string,
      output: string,}>
  code_verify: string,
  user_code: string,
}
