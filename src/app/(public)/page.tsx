// import { cookies } from "next/headers";

import categoryApiRequest from "@/apiRequest/category";
import Categories from "./Categories";
import ListProduct from "./ListProduct";
import productApiRequest from "@/apiRequest/product";

async function Page({ searchParams }: { searchParams: { category?: string } }) {
  const { category } = searchParams;
  console.log("🚀 ~ Page ~ category:", category);
  const categories = await categoryApiRequest.getAllCategories();
  const data = await productApiRequest.findAllOrTypePublishProduct({
    category: category || "",
    limit: 10,
    page: 1,
  });
  console.log("🚀 ~ Page ~ initialProducts:", data);
  return (
    <div className="bg-bg_cyan pt-6">
      {categories.data && <Categories categories={categories.data} />}
      <ListProduct data={data} />
    </div>
  );
}
export default Page;
