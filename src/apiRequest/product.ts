import http from "@/lib/http";
import { CategoryItem } from "@/models/category";
import { ResponseData } from "@/models/common";

const productApiRequest = {
  findAllOrTypePublishProduct: ({
    category,
    page,
    limit,
  }: {
    category: string;
    page: number;
    limit: number;
  }) => {
    return http.get<ResponseData<CategoryItem[]>>(
      `v1/api/product/findAllOrTypePublishProduct?category=${category}&page=${page}&limit=${limit}`
    );
  },
};
export default productApiRequest;
