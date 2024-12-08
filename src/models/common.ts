enum Role {
  ADMIN = "admin",
  CUSTOMMER = "custommer",
}
export const RoleValues = [Role.ADMIN, Role.CUSTOMMER] as const;

export enum API_CODE {
  SUCCESS = 200,
  FAILURE = 400,
}
export type ApiResponse = {
  code: number;
  message: string;
};

export type ResponseData<D> = ApiResponse & {
  data: D;
};
export type ApiResponseError = {
  status: number;
  statusText: string;
};

type Paging = {
  p?: number;
  limit?: number;
};

export type PagingParams<P = void> = P extends void
  ? Paging | void
  : Paging & P;

export type PagingResponseData<D> = ApiResponse & {
  total_pages: number;
  total: number;
  per_page: number;
  current_page: number;
  data: D[];
  //from:number;
  //to:number;
};
