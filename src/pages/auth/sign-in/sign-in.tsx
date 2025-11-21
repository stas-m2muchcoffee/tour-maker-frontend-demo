import { FormProvider, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { useAuth } from "../../../hooks/use-auth.ts";
import { AppInput } from "../../../components/app-input/index.tsx";
import { SignInDto } from "./dtos.ts";
import { AppButton } from "../../../components/app-button/index.tsx";

const SignInPage = () => {
  const form = useForm<SignInDto>({
    resolver: classValidatorResolver(SignInDto),
  });
  const { handleSubmit } = form;

  const { signIn } = useAuth();

  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-center">
      <div className="mb-12">
        <h2 className="text-primary text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-secondary">Continue your exploration</p>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(signIn)}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <AppInput
            name="email"
            labelText="Email"
            type="email"
            placeholder="Enter your email"
          />
          <AppInput
            name="password"
            labelText="Password"
            type="password"
            placeholder="Enter your password"
          />
          <AppButton type="submit" text="Sign in" iconName="log-in" />
        </form>
      </FormProvider>
      <p className="text-secondary flex items-center">
        Don't have an account?
        <AppButton to="/sign-up" text="Sign up" fill="clear" />
      </p>
    </div>
  );
};

export default SignInPage;
