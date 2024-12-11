// import { cookies } from "next/headers";

import categoryApiRequest from "@/apiRequest/category";
import Categories from "./Categories";
import ListProduct from "./ListProduct";
import productApiRequest from "@/apiRequest/product";
import { Suspense } from "react";
import Loading from "./loading";

async function Page({ searchParams }: { searchParams: { category?: string } }) {
  const { category } = searchParams;
  const categories = await categoryApiRequest.getAllCategories();
  const res = await productApiRequest.findAllOrTypePublishProduct({
    product_type: category || "",
    limit: 30,
    page: 1,
  });
  return (
    <div className=" pt-20 mb-20 min-h-screen">
      <Suspense fallback={<Loading />}>
        <Categories categories={categories.data} />
        <ListProduct data={res} />
      </Suspense>
    </div>
  );
}
export default Page;
