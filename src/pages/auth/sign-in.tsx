import { useForm } from "react-hook-form";

import { type SignInInput } from "../../graphql/__generated__/graphql";
import { useAuth } from "../../hooks/use-auth.ts";

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInInput>();
  const { signIn } = useAuth();

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold mb-6">Sign in</h1>
      <form
        onSubmit={handleSubmit(signIn)}
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
