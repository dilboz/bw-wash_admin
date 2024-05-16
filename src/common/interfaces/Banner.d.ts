export interface IBanner {
  imagePath: string;
  href: string;
  id: string;
}

export interface IBannerState {
  pending: boolean;
  error: string | null;
  data: IBanner[];
}
