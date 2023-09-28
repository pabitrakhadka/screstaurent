import React from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
const notLoginForm = () => {

  const router = useRouter();
  return (
    <>
      <div className="notlogin d-flex justify-content-center align-item-center">
        <div className="shadow-lg p-3 mb-5 bg-body rounded loginShow    ">
          <h1 className="mb-5"> Please Login! </h1>
          <div className="flex mt-3">
            <button
              className="btn bg-danger text-white"
              onClick={() => {
                router.push("/register");
              }}
            >
              Register
            </button>
            <button
              className="btn bg-success text-white "
              onClick={(_) => signIn()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default notLoginForm;
