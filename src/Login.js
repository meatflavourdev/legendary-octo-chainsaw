import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function Login() {
  let thisuser = '';
  useEffect(() => {
    async function dostuff() {
      let { user, error } = await supabase.auth.signIn({
        email: 'zenimus@gmail.com',
        password: 'password'
      })
      console.log(user)
      console.log(error)
    }

    dostuff()

  }, [])

  thisuser = supabase.auth.user()
  return (
    <div>
      <h2>Login</h2>
      <h3>user: {thisuser.email}</h3>
    </div>
  );
}

export default Login;
