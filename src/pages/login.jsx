import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [authState, setAuthState] = useState({
    email: "",
    password: "",
    loginType:""
  });
  const [pageState, setPageState] = useState({
    error: "",
    processing: false,
  });

  const handleFieldChange = (e) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const simplifyError = (error) => {
    const errorMap = {
      CredentialsSignin: "Invalid username or password",
    };
    return errorMap[error] ?? "Unknown error occurred";
  };

  const handleAuth = async () => {
    authState.loginType="user";
    setPageState((old) => ({ ...old, processing: true, error: "" }));
    try {
      const response = await signIn("credentials", {
       
        ...authState,
        redirect: false,
      });

      if (response.error) {
        // Handle authentication error
        toast.error("Invalid username or password", {
          // ...
        });
        setPageState((old) => ({
          ...old,
          processing: false,
          error: response.error,
        }));
      } else if (response.ok) {
        // Handle successful login
        toast.success("Login Successful !", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",

        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
      // Handle unexpected errors
      setPageState((old) => ({
        ...old,
        processing: false,
        error: "Something went wrong!",
      }));
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <div className="user_login_outer mt-2">
        <div className="user_login">
          <form className=" p-3 mb-5 bg-body  box_border">
            <h4 className="text-center p-0 m-0 ">User Login</h4>
            <div className="text-center">
              <i className="bi bi-person-circle user_icon text-primary"></i>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                onChange={handleFieldChange}
                value={authState.email}
                id="email"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                onChange={handleFieldChange}
                value={authState.password}
                id="password"
              />
              <label htmlFor="floatingInput">Password</label>
            </div>
            {pageState.error !== "" && <p> {simplifyError(pageState.error)}</p>}
            <div className="text-center">
              <button
                disabled={pageState.processing}
                onClick={handleAuth}
                className="btn text-center btn allbtn"
                type="submit"
              >
                Login
              </button>
              <p className="">

                <Link href="Forget">forget password?</Link>
              </p>
            </div>
            <div className="register_footer ">
              <p className="">
                Have an account &nbsp;
                <Link href="/register">Register?</Link>
              </p>
            </div>
            {/* <div className="text-center mx-1">
            <a className="" href="/register">
              Don't have an account?
            </a>{" "}
          </div> */}
          </form>
        </div>

      </div>
    </Layout>
  );
};

export default Login;
