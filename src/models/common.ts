enum Role {
  ADMIN = "admin",
  CUSTOMMER = "custommer",
}
export const RoleValues = [Role.ADMIN, Role.CUSTOMMER] as const;

export enum API_CODE {
  SUCCESS = 201,
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
