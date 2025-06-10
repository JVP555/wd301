export interface Member {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface MembersState {
  members: Member[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
