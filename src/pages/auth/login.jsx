import { signIn, signOut, useSession } from 'next-auth/react';
import GoogleButton from 'react-google-button';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {!session && (
        <>
          <GoogleButton onClick={() => signIn('google')}></GoogleButton>
        </>
      )}
      {session && (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}