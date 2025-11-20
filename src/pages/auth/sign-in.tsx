import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import {
  SignInDocument,
  type SignInInput,
} from "../../graphql/__generated__/graphql";
import { RoutePath } from "../../enums/route-path.enum.ts";

const SignInPage = () => {
  const { register, handleSubmit, reset } = useForm<SignInInput>();
  const [signIn] = useMutation(SignInDocument);
  const navigate = useNavigate();

  const onSubmit = async (data: SignInInput) => {
    try {
      const result = await signIn({ variables: { input: data } });
      const token = result.data?.auth.signIn.token;
      if (token) {
        window.localStorage.setItem("token", token);
        navigate(RoutePath.TOURS);
      }
      reset();
    } catch (mutationError) {
      console.error(mutationError);
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold mb-6">Sign in</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md"
      >
        <input
          type="email"
          placeholder="Email"
          className="border rounded px-3 py-2"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2"
          {...register("password", { required: true })}
        />
        <button type="submit" className="border rounded px-3 py-2">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
