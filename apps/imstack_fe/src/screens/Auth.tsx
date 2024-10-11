import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AuthPageImage from "../images/authpageimage.png";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";

const Auth = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigation = useNavigate();

  useEffect(() => {
    if (user?.firstName) {
      console.log(user.firstName);
    }
    if (isSignedIn) {
      navigation({ to: "/home" });
    }
  }, [isSignedIn]);

  return (
    <div className="w-full lg:grid lg:h-screen lg:grid-cols-2 xl:h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M7.75432 1.81954C7.59742 1.72682 7.4025 1.72682 7.24559 1.81954L1.74559 5.06954C1.59336 5.15949 1.49996 5.32317 1.49996 5.5C1.49996 5.67683 1.59336 5.84051 1.74559 5.93046L7.24559 9.18046C7.4025 9.27318 7.59742 9.27318 7.75432 9.18046L13.2543 5.93046C13.4066 5.84051 13.5 5.67683 13.5 5.5C13.5 5.32317 13.4066 5.15949 13.2543 5.06954L7.75432 1.81954ZM7.49996 8.16923L2.9828 5.5L7.49996 2.83077L12.0171 5.5L7.49996 8.16923ZM2.25432 8.31954C2.01658 8.17906 1.70998 8.2579 1.56949 8.49564C1.42901 8.73337 1.50785 9.03998 1.74559 9.18046L7.24559 12.4305C7.4025 12.5232 7.59742 12.5232 7.75432 12.4305L13.2543 9.18046C13.4921 9.03998 13.5709 8.73337 13.4304 8.49564C13.2899 8.2579 12.9833 8.17906 12.7456 8.31954L7.49996 11.4192L2.25432 8.31954Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h6 className="font-bold text-xl">IM Stack</h6>
            </div>
            <h1 className="text-lg font-bold">Welcome to IM Stack</h1>
            <h1 className="text-2xl font-bold">
              Great minds don't just seek knowledge, they share it. Let's build
              a world where learning is for everyone.
            </h1>
          </div>
          <div className="grid gap-4">
            <p>
              Already have an account? Sign in here. New here? Create an account
              by clicking Sign up!
            </p>
          </div>
          <div className="grid gap-4">
            <Button onClick={() => clerk.openSignIn()}>Sign In</Button>
            <Button variant="outline" onClick={() => clerk.openSignUp()}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={AuthPageImage}
          alt="Image"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Auth;
