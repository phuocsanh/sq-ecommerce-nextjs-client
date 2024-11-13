import envConfig from "@/config";
import { normalizePath } from "@/lib/utils";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  constructor({
    status,
    payload,
    message = "Lỗi HTTP",
  }: {
    status: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload, message: "Lỗi thực thể" });
    this.status = status;
    this.payload = payload;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let clientLogoutRequest: null | Promise<any> = null;
const isClient = typeof window !== "undefined";
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };
  if (isClient) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;
  console.log("🚀 ~ baseUrl:", baseUrl);

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: typeof ENTITY_ERROR_STATUS;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("/api/auth/logout", {
            method: "POST",
            body: null, // Logout luôn  thành công
            headers: {
              ...baseHeaders,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            },
          });
          try {
            await clientLogoutRequest;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
          } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            clientLogoutRequest = null;
            // Redirect to Login có thể lặp vô hạn nếu gọi api 1 nào đó cẩn accessToken vì nó đã bị xóa
            location.href = "/login";
          }
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const accessToken = (options?.headers as any)?.Authorization.split(
          "Bearer "
        )[1];
        redirect(`/logout?accessToken=${accessToken}`);
      }
    } else {
      throw new HttpError(data);
    }
  }
  // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
  if (isClient) {
    const normalizeUrl = normalizePath(url);
    if (normalizeUrl === "api/auth/login") {
      const { accessToken, refreshToken } = (payload as LoginResType).data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else if (normalizeUrl == "api/auth/logout") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  patch<Response>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
