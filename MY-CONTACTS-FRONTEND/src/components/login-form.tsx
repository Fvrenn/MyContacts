import { cn } from "@/lib/utils";
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
import { Link } from "react-router-dom";
import AuthService from "../service/auth.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";
interface LoginFormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: LoginFormElements;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<LoginFormElement>) {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
    const password = event.currentTarget.elements.passwordInput.value;

    try {
      await AuthService.login(username, password);
      navigate(`/`);
    } catch (err: any) {
      if (err?.response?.status) {
        switch (err.response.status) {
          case 401:
            toast("Erreur de connexion", {
              description: "Identifiants incorrects. Veuillez réessayer.",
            });
            break;
          case 500:
            toast("Erreur serveur", {
              description:
                "erreur interne",
            });
            break;
          default:
            toast("Erreur", {
              description:
                err?.response?.data?.message ||
                "Une erreur inattendue est survenue.",
            });
            break;
        }
      } else {
        toast("Erreur", {
          description: "Impossible de se connecter au serveur.",
        });
      }
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="usernameInput"
                  name="usernameInput"
                  type="text"
                  placeholder="Username"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="passwordInput"
                  name="passwordInput"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
