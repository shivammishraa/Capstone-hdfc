import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { loginUser } from "../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const token = await loginUser(data.email, data.password);
      dispatch(loginSuccess(token));
      localStorage.setItem("token", token);
    } catch (error) {
      setErrorMsg("Invalid credentials. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 w-full max-w-xl mx-auto p-12 rounded-2xl border border-white/20 bg-transparent backdrop-blur-md shadow-2xl"
    >
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        className="bg-white/20 text-white placeholder-white/70 text-lg py-3"
      />
      {errors.email && (
        <p className="text-red-400 text-sm">{errors.email.message}</p>
      )}

      <Input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
        className="bg-white/20 text-white placeholder-white/70 text-lg py-3"
      />
      {errors.password && (
        <p className="text-red-400 text-sm">{errors.password.message}</p>
      )}

      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

      <Button
        type="submit"
        className="w-full bg-[#035d9c] hover:bg-[#035d9c]/90 text-white text-lg py-3"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
