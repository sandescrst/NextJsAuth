//new nextjs
// import '../styles/Home.module.css'
// import { Button } from 'reactstrap'
import { useSession, signIn, signOut } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css'
import Image from "next/image"
import Cookies from 'js-cookie';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading"
  if(session) {
    session["auth_token"] = "A2345";
    // Cookies.set("_token", session["a_token"]);
  }
  return (
        <div>
          {loading && <p>Loading...</p>}
          {!session && (
            <>
              <h3>you are not signed in</h3> <br />
              <button
                className='btn btn-secondary'
                type="button"
                onClick={() => {
                    signIn("google", { callbackUrl: process.env.NEXTAUTH_URL })
                  }
                }
              >
                <Image src="/google.ico" width="30" height="30"/> Sign in with Google
              </button>
            </>
          )}
          {session && (
            <>
              <Image src={session.user.image} height="60" width="60" className="profile_img"/><br/> Signed in as: {session.user.name} {session.user.email} <br />
              <button className='btn btn-primary' onClick={() => signOut()}>Sign out</button>
            </>
          )}
        </div>
      );
}