import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign up",
};

async function signUp(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  await supabase.auth.signUp({ email, password });

  redirect("/");
}

export default function SignUpPage() {
  return (
    <main>
      <h1>Sign up page</h1>
      <form className="auth-form" action={signUp}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          minLength={6}
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </main>
  );
}
