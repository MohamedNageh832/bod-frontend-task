import { FormError, FormInput } from "@/shared/components/form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignInFormState,
  selectStatus,
  selectUser,
  updateSignInValue,
} from "../store";
import type { AppDispatch } from "@/store";
import { Button } from "@/shared/components/ui";
import { fetchCurrentUser, signIn } from "../thunks";
import { useEffect, type ChangeEvent, type FormEvent } from "react";
import { Logo } from "@/shared/layout";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/constants";
import { Info, Loader2 } from "lucide-react";

const SignInForm = () => {
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const isFetched = !["idle", "loading"].includes(status.fetchCurrentUser);
  const formState = useSelector(selectSignInFormState);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || isFetched) return;
    dispatch(fetchCurrentUser());
  }, [user, dispatch, isFetched]);

  useEffect(() => {
    if (user && isFetched) navigate(ROUTES.home.ui.root);
  }, [user, navigate, isFetched]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateSignInValue({ [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(signIn());

    if (result.meta.requestStatus !== "fulfilled") return;
    navigate(ROUTES.home.ui.root);
  };

  return (
    <form
      className="flex flex-col gap-6 border p-5 rounded-lg w-[350px] max-w-[90%]"
      onSubmit={handleSubmit}
    >
      <header className="flex flex-col gap-2">
        <Logo />
        <p className="text-sm text-muted-foreground">Your reliable dashboard</p>
      </header>

      <section className="flex gap-3 p-5 rounded-lg bg-blue-50">
        <Info />

        <section className="flex flex-col gap-1">
          <p>
            Username: <b>michaelw</b>
          </p>
          <p>
            Password: <b>michaelwpass</b>
          </p>
        </section>
      </section>

      {formState.errors.formError && (
        <FormError>{formState.errors.formError}</FormError>
      )}

      <section className="flex flex-col gap-3">
        <FormInput
          label="Username"
          name="username"
          id="username"
          value={formState.values["username"]}
          onChange={handleChange}
          error={formState.errors.username}
        />

        <FormInput
          label="Password"
          name="password"
          id="password"
          value={formState.values["password"]}
          onChange={handleChange}
          type="password"
          error={formState.errors.password}
        />
      </section>

      <Button
        className="flex items-center gap-2"
        type="submit"
        disabled={formState.status === "loading"}
      >
        {formState.status === "loading" ? (
          <>
            <Loader2 className="animate-spin" />
            Loading...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
};

export default SignInForm;
