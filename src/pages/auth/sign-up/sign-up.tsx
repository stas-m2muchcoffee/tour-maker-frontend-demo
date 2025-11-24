import { FormProvider, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { useAuth } from "../../../hooks/use-auth.ts";
import { AppInput } from "../../../components/app-input/index.tsx";
import { SignUpDto } from "./dtos.ts";
import { AppButton } from "../../../components/app-button/index.tsx";
import { AppToggleGroup } from "../../../components/app-toggle-group/index.tsx";
import { userPreferenceOptions } from "../../../constants/user-preferences.ts";

const SignUpPage = () => {
  const { signUp, signUpLoading } = useAuth();
  const form = useForm<SignUpDto>({
    resolver: classValidatorResolver(SignUpDto),
    disabled: signUpLoading,
  });
  const { handleSubmit } = form;

  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-center">
      <div className="mb-12 text-center">
        <h2 className="text-primary text-2xl font-bold mb-2">Welcome</h2>
        <p className="text-secondary">Create your account to continue</p>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(signUp)}
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
          <AppToggleGroup
            name="preferences"
            labelText="Preferences"
            options={userPreferenceOptions}
            displayCustomValue
            customValuePlaceholder="Enter your own..."
          />
          <AppButton type="submit" text="Sign up" iconName="user-plus" />
        </form>
      </FormProvider>
      <p className="text-secondary flex items-center">
        Already have an account?
        <AppButton to="/sign-in" text="Sign in" fill="clear" />
      </p>
    </div>
  );
};

export default SignUpPage;
