import http from "@/lib/http";
import { UpdatePassBodyType, UpdatePassType } from "@/models/auth";
import { CategoryItem } from "@/models/category";
import { PagingResponseData, ResponseData } from "@/models/common";

const categoryApiRequest = {
  getAllCategories: () => {
    return http.get<ResponseData<CategoryItem[]>>(
      "v1/api/category/get-all-categories"
    );
  },
};
export default categoryApiRequest;
