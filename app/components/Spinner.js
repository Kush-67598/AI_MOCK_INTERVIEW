"use client";
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <ClipLoader color="#fff" size={24} />
    </div>
  );
}