import React from "react";
import { useSession } from "next-auth/react";

const check = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="details">
        {console.log(session)}
        <p>Name: {session.user.name}</p>

        <p>email: {session.user.email}</p>
      </div>
    );
  } else {
    return <a href="/api/auth/signin">Sign in</a>;
  }
};

export default check;
