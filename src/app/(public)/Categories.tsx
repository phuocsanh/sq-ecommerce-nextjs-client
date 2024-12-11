"use client";
import React from "react";
import Img from "@/app/components/Img";
import Block from "@/app/components/Block";
import { CategoryItem } from "@/models/category";
import { useRouter } from "next/navigation";

function Categories({ categories }: { categories: CategoryItem[] }) {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`?category=${categoryName}`); // Thêm categoryId vào URL
  };

  return (
    <Block>
      <section className=" py-2 md:py-4 lg:py-7  w-full items-center ">
        {/* Container cuộn ngang trên mobile */}
        <div className="overflow-x-auto sm:overflow-visible w-full">
          <div className="flex space-x-5 justify-center ">
            {categories.length > 0 &&
              categories.map((category) => (
                <div
                  onClick={() => {
                    handleCategoryClick(category.category_name);
                  }}
                  key={category._id}
                  className="flex flex-col items-center cursor-pointer transition-transform duration-300 transform hover:scale-105"
                >
                  <div className="w-24 h-24 sm:w-12 sm:h-12 md:w-20 md:h-20  rounded-full overflow-hidden shadow-sm">
                    <Img
                      key={category._id}
                      src={category.category_picture}
                      alt={`category${category._id}.png`}
                    />
                  </div>
                  <p className="mt-2 text-center text-sm">
                    {category.category_title}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Block>
  );
}

export default Categories;
