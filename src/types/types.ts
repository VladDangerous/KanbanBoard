export interface Issue {
    id: string;
    name: string;
    description?: string;
  }
  

  export interface ColumnType {
    id: string;
    title: string;
    issues: Issue[];
  }
  
  export type BoardData = ColumnType[];