"use client";
import React, { useEffect, useState } from "react";
// import Img from "@/app/components/Img";
import Block from "@/app/components/Block";
import productApiRequest from "@/apiRequest/product";
import Img from "../components/Img";

function ListProduct({ data }: { data: any }) {
  const [products, setProducts] = useState(data.data.data);
  const [currentPage, setCurrentPage] = useState(data.data.currentPage);
  const [totalPages, setTotalPages] = useState(data.data.totalPages);
  const [loading, setLoading] = useState(false);

  const loadMoreProducts = async () => {
    if (loading || currentPage >= totalPages) return;

    setLoading(true);
    const nextPage = currentPage + 1;

    const data = await productApiRequest.findAllOrTypePublishProduct({
      category: "",
      limit: 10,
      page: nextPage,
    });
    console.log("🚀 ~ loadMoreProducts ~ data:", data);

    setProducts((prev) => [...prev, ...data.data.data]);
    setCurrentPage(nextPage);
    setLoading(false);
  };
  // Lắng nghe sự kiện cuộn
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        !loading
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, loading]);
  return (
    <Block>
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 py-8 bg-white">
        {products.length > 0 &&
          products.map((p) => (
            <div
              onClick={() => {}}
              key={p._id}
              className="flex flex-col items-center cursor-pointer shadow-md transition-transform duration-300 transform hover:scale-105"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-sm">
                <Img src={p.product_thumb} alt={`category${p._id}.png`} />
              </div>
              <p className="mt-2 text-center">{p.product_description}</p>
            </div>
          ))}
      </section>
    </Block>
  );
}

export default ListProduct;
