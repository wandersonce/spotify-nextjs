'use client';
import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

function Login() {
  const [providers, setProviders] = useState(null);
  const [providerName, setProviderName] = useState('');

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  useEffect(() => {
    if (providers != null) {
      Object.values(providers).map((provider) => {
        setProviderName(provider.name);
      });
    }
  }, [providers]);

  return (
    <div>
      <img
        className="w-52 mb-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        alt="Spotify Logo"
      />
      <div>
        <button>Login with {providerName}</button>
      </div>
    </div>
  );
}

export default Login;

// export async function getServerSideProps() {
//   const providers = await getProviders();
//   console.log('here');
//   return {
//     props: {
//       providers,
//     },
//   };
// }
