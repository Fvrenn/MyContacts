import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AuthService from "../service/auth.service";
import { Link, useNavigate } from "react-router";

interface SignupFormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
}
interface SignupFormElement extends HTMLFormElement {
  readonly elements: SignupFormElements;
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  async function handleSignup(event: React.FormEvent<SignupFormElement>) {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
    const email = event.currentTarget.elements.emailInput.value;
    const password = event.currentTarget.elements.passwordInput.value;
    const confirmPassword =
      event.currentTarget.elements.confirmPasswordInput.value;
    try {
      if (password == confirmPassword) {
        const response = await AuthService.register(username, email, password);
        console.log("register success:", response);
        navigate(`/Login`);
      } else {
        console.error(" il faut deux mdp pareille ");
      }
    } catch (err: any) {
      console.error("login error:", err);
      alert(
        err?.response?.data?.message || err?.message || "Erreur lors du login"
      );
    }
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">User Name</FieldLabel>
              <Input
                id="usernameInput"
                name="usernameInput"
                type="text"
                placeholder="Username"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="emailInput"
                name="emailInput"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="passwordInput"
                name="passwordInput"
                type="password"
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPasswordInput"
                name="confirmPasswordInput"
                type="password"
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/signup">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
