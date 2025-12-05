"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";

const data = [
  { key: "dashboard", value: "Overview", url: "/dashboard" },
  { key: "products", value: "Products", url: "/dashboard/products" },
  { key: "kaban", value: "Kaban", url: "/dashboard/kaban" },
];

export default function Header() {
  const listPath = usePathname().split("/").filter(Boolean);
  console.log(listPath);

  const listPathData = listPath
    .map((item) => {
      return data.find((e) => e.key == item);
    })
    .filter(Boolean);
  console.log(listPathData);

  return (
    <header className="">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          {listPathData.map((item) => (
            <React.Fragment key={item?.key}>
              <BreadcrumbItem >
                <BreadcrumbLink href={item?.url}>{item?.value}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
