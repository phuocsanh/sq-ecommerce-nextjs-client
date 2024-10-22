type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchResponse<T> {
  data: T | null;
  isLoading: boolean;
}

async function fetchDataWithAuth<T, U = undefined>(
  url: string,
  method: RequestMethod,
  accessToken: string,
  body?: U
): Promise<FetchResponse<T>> {
  let isLoading = true; // Khởi tạo trạng thái isLoading
  try {
    const options: RequestInit = {
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include", // Gắn cookies vào request
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: T = await response.json();
    isLoading = false; // Dữ liệu đã tải xong, isLoading = false
    return { data, isLoading };
  } catch (error) {
    console.error(`Fetch ${method} with auth error:`, error);
    isLoading = false;
    return { data: null, isLoading };
  }
}
