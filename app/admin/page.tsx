import LoginForm from "@/components/LoginForm";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-100px)] ">
      <div className="w-[400px]">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
