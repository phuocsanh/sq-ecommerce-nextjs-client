import http from "@/lib/http";
import { CategoryItem } from "@/models/category";
import { ResponseData } from "@/models/common";

const categoryApiRequest = {
  getAllCategories: () => {
    return http.get<ResponseData<CategoryItem[]>>(
      "v1/api/category/getAllCategories"
    );
  },
};
export default categoryApiRequest;
