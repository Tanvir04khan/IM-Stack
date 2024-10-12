import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AuthPageImage from "../images/authpageimage.png";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import { Layers } from "lucide-react";

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
            <div className="flex items-center justify-center gap-4">
              <Layers />
              <h6 className="font-bold text-3xl">IM Stack</h6>
            </div>
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
