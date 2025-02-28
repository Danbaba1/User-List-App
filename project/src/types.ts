export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}