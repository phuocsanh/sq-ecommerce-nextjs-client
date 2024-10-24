interface FetchResponse<T> {
  data: T | null;
  code: number;
  message: string;
}
type ApiResponse = {
  code: number;
  message: string;
};
const errorApiResponse: ApiResponse = {
  code: 0,
  message: "",
};
const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

async function POST<Q, P>(
  url: string,
  body: Q,
  rq_options?: RequestInit
): Promise<FetchResponse<P>> {
  // Hàm tạo FormData từ đối tượng
  const createFormData = (): FormData => {
    const formData = new FormData();
    if (body) {
      Object.keys(body).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (body as any)[key]; // Cast để lấy giá trị
        formData.append(key, value);
      });
    }
    return formData;
  };
  try {
    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
    };
    // Chỉ thêm Content-Type nếu body không phải là FormData
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    const options: RequestInit = {
      method: "POST",
      headers: headers, // Sử dụng headers đã định nghĩa ở trên
      credentials: "include", // Gắn cookies vào request
      ...rq_options,
    };
    // Kiểm tra xem body có phải là FormData hay không
    if (body instanceof FormData) {
      options.body = createFormData(); // Nếu là FormData, gán trực tiếp
    } else {
      options.body = JSON.stringify(body); // Nếu không, chuyển đổi thành JSON
    }
    const response = await fetch(url, options);
    if (response.status !== 200) {
      errorApiResponse.code = response.status;
      errorApiResponse.message = response.statusText;
      throw errorApiResponse;
    }
    const data: P = await response.json();
    return { data, code: response.status, message: response.statusText };
  } catch (error) {
    console.error(`Post ${url} with auth error:`, error);
    const err = error as ApiResponse;
    return {
      data: null,
      ...err,
    };
  }
}

async function GET<T>(
  url: string,
  rq_options?: RequestInit
): Promise<FetchResponse<T>> {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include", // Gắn cookies vào request
      ...rq_options,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error();
    }

    const data: T = await response.json();
    return { data, code: response.status, message: response.statusText };
  } catch (error) {
    console.error(`Get ${url} with auth error:`, error);
    const err = error as Response;
    return { data: null, code: err.status, message: err.statusText };
  }
}

async function PUT<Q, P>(
  url: string,
  body: Q,
  rq_options?: RequestInit
): Promise<FetchResponse<P>> {
  // Hàm tạo FormData từ đối tượng
  const createFormData = (): FormData => {
    const formData = new FormData();
    if (body) {
      Object.keys(body).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (body as any)[key]; // Cast để lấy giá trị
        formData.append(key, value);
      });
    }
    return formData;
  };

  try {
    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Chỉ thêm Content-Type nếu body không phải là FormData
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
      method: "PUT",
      headers: headers, // Sử dụng headers đã định nghĩa ở trên
      credentials: "include", // Gắn cookies vào request
      ...rq_options,
    };

    // Kiểm tra xem body có phải là FormData hay không
    if (body instanceof FormData) {
      options.body = createFormData(); // Nếu là FormData, gán trực tiếp
    } else {
      options.body = JSON.stringify(body); // Nếu không, chuyển đổi thành JSON
    }

    const response = await fetch(url, options);
    if (response.status !== 200) {
      errorApiResponse.code = response.status;
      errorApiResponse.message = response.statusText;
      throw errorApiResponse;
    }
    const data: P = await response.json();
    return { data, code: response.status, message: response.statusText };
  } catch (error) {
    console.error(`Put ${url} with auth error:`, error);
    const err = error as ApiResponse;
    return {
      data: null,
      ...err,
    };
  }
}

async function PATCH<Q, P>(
  url: string,
  body: Q,
  rq_options?: RequestInit
): Promise<FetchResponse<P>> {
  // Hàm tạo FormData từ đối tượng
  const createFormData = (): FormData => {
    const formData = new FormData();
    if (body) {
      Object.keys(body).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (body as any)[key]; // Cast để lấy giá trị
        formData.append(key, value);
      });
    }
    return formData;
  };

  try {
    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Chỉ thêm Content-Type nếu body không phải là FormData
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
      method: "PATCH",
      headers: headers, // Sử dụng headers đã định nghĩa ở trên
      credentials: "include", // Gắn cookies vào request
      ...rq_options,
    };

    // Kiểm tra xem body có phải là FormData hay không
    if (body instanceof FormData) {
      options.body = createFormData(); // Nếu là FormData, gán trực tiếp
    } else {
      options.body = JSON.stringify(body); // Nếu không, chuyển đổi thành JSON
    }

    const response = await fetch(url, options);
    if (response.status !== 200) {
      errorApiResponse.code = response.status;
      errorApiResponse.message = response.statusText;
      throw errorApiResponse;
    }
    const data: P = await response.json();
    return { data, code: response.status, message: response.statusText };
  } catch (error) {
    console.error(`Put ${url} with auth error:`, error);
    const err = error as ApiResponse;
    return {
      data: null,
      ...err,
    };
  }
}

async function DELETE<T>(
  url: string,
  rq_options?: RequestInit
): Promise<FetchResponse<T>> {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include", // Gắn cookies vào request
      ...rq_options,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error();
    }

    const data: T = await response.json();
    return { data, code: response.status, message: response.statusText };
  } catch (error) {
    console.error(`Delete ${url} with auth error:`, error);
    const err = error as Response;
    return { data: null, code: err.status, message: err.statusText };
  }
}

export const resquestApi = {
  GET,
  PUT,
  POST,
  PATCH,
  DELETE,
};
