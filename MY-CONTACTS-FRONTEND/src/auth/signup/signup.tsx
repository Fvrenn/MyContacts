import { SignupForm } from "@/components/signup-form"
import { Toaster } from "sonner";
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Toaster />
        <SignupForm />
      </div>
    </div>
  )
}
