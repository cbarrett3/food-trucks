import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Food Truckies",
  description: "Sign in to your Food Truckies account to save favorites and track your favorite food trucks.",
}

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  )
}
