import { Cookie } from "next/font/google";
import React from "react";
import { cookies } from "next/headers";
import categoryApiRequest from "@/apiRequest/category";
import Image from "next/image";
import Img from "../Img";

async function Categories() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const categories = await categoryApiRequest.getAllCategories();
  console.log("🚀 ~ Categories ~ categories:", categories);
  return (
    <section className="flex flex-row">
      {categories.data.map((category) => (
        <div key={category._id}>
          <div
            className="w-80 h-80 mt-3 relative"
            style={{ position: "relative", width: "20rem", height: "20rem" }}
          >
            <Image
              fill
              key={category._id}
              src={category.category_picture}
              alt={`category${category._id}.png`}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default Categories;
