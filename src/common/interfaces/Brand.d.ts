export interface IBrand {
  id: string;
  imagePath: string;
  name: string;
}

export interface IBrandState {
  pending: boolean;
  error: string | null;
  data: IBrand[];
}
