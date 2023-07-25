'use client';
import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

function Login() {
  const [providers, setProviders] = useState(null);
  const [providerName, setProviderName] = useState('');
  const [providerId, setProviderId] = useState('');

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
        setProviderId(provider.id);
      });
    }
  }, [providers]);

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
      <img
        className="w-52 mb-8"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        alt="Spotify Logo"
      />
      <div>
        <button
          onClick={() => signIn(providerId, { callbackUrl: '/' })}
          className="bg-[#18D860] text-white p-5 rounded-lg"
        >
          Login with {providerName}
        </button>
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
