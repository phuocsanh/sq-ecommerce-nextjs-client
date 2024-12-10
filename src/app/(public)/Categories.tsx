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
      <section className="flex flex-row  py-7 self-center justify-center items-center">
        {categories.length > 0 &&
          categories.map((category) => (
            <div
              onClick={() => {
                handleCategoryClick(category.category_name);
              }}
              key={category._id}
              className=" mx-5 flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-sm">
                <Img
                  key={category._id}
                  src={category.category_picture}
                  alt={`category${category._id}.png`}
                />
              </div>
              <p className="mt-2">{category.category_title}</p>
            </div>
          ))}
      </section>
    </Block>
  );
}

export default Categories;
