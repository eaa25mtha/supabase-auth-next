import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign up",
};

//server actions
//signUp funktionen køres når vi trykker "sign up" inde på appen
async function signUp(formData) {
  "use server"; //funktionen køres på serveren, altså ikke lokalt

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const data = await supabase.auth.signUp({ email, password });
  if (data.error) {
    redirect("/signup?error=true");
  }

  redirect("/");
}

export default async function SignUpPage({ searchParams }) {
  const { error } = await searchParams;

  return (
    <main>
      <h1>Sign up page</h1>
      {error && (
        <p className="form-error" role="alert">
          Could not sign up. Maybe the email is already in use.
        </p>
      )}
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
