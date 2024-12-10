"use client";
import React, { useEffect, useState } from "react";
import Block from "@/app/components/Block";
import productApiRequest from "@/apiRequest/product";
import Img from "../components/Img";
import { useInfiniteQuery } from "@tanstack/react-query";
import { convertCurrency } from "@/lib/utils";
import { IoMdStar } from "react-icons/io";
import { useSearchParams } from "next/navigation";

function ListProduct({ data }: { data: any }) {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const {
    data: queryData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", category],
    queryFn: async ({ pageParam }) => {
      const res = await productApiRequest.findAllOrTypePublishProduct({
        category: category || "",
        limit: 30,
        page: pageParam || 1,
      });

      return res;
    },
    getNextPageParam: (pages) => {
      if (pages.data.currentPage === pages.data.totalPages) {
        return undefined;
      }
      return pages.data.currentPage + 1;
    },
    initialPageParam: data.data.currentPage,
    initialData: {
      pages: [data],
      pageParams: [1],
    },
  });

  const products = queryData?.pages.flatMap((page) => page.data.data) || [];

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage]);

  return (
    <Block>
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6  bg-white">
        {products.length > 0 &&
          products.map((p) => (
            <div
              onClick={() => {}}
              key={p?._id}
              className=" pb-2  bg-white flex flex-col items-center cursor-pointer shadow-md transition-transform duration-300 transform hover:scale-105"
            >
              <div className="w-full h-40  overflow-hidden shadow-sm">
                <Img src={p?.product_thumb} alt={`category${p?._id}.png`} />
              </div>
              <div className="flex flex-col flex-grow justify-between w-full">
                <p className="mt-2 px-2 line-clamp-2 font-semibold">
                  {p?.product_name}
                </p>
                <div>
                  <div className="flex justify-between">
                    <p className="mt-1 px-2 line-clamp-2 text-slate-400 italic text-sm">
                      size: {p?.product_attributes.size}
                    </p>
                    <p className="mt-1 flex px-2 line-clamp-2 text-slate-400 italic items-center text-sm">
                      {p?.product_ratingsAverage}
                      <IoMdStar className="ml-1 text-yellow-400" />
                    </p>
                  </div>
                  <p className="mt-2 px-2 text-primary font-semibold">
                    {convertCurrency(p?.product_price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </section>
    </Block>
  );
}

export default ListProduct;
