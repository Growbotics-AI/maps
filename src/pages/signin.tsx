import { signIn, signOut, useSession } from 'next-auth/react'

import Layout from '#components/Layout'

const SignInPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Layout>
        <div className="flex-1 p-4">
          <p>Loading...</p>
        </div>
      </Layout>
    )
  }

  if (session) {
    return (
      <Layout>
        <div className="flex-1 p-4">
          <h1 className="mb-4 text-2xl font-bold">Welcome, {session.user?.name || 'User'}!</h1>
          <p className="mb-4">You are currently signed in.</p>
          <button
            onClick={() => signOut()}
            type="button"
            className="hover:bg-sky-800 rounded bg-primary px-4 py-2 font-bold text-white"
          >
            Sign out
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex-1 p-4">
        <h1 className="mb-4 text-2xl font-bold">Sign In</h1>
        <p className="mb-4">Please choose a sign-in method:</p>
        <button
          onClick={() => signIn('google')}
          type="button"
          className="hover:bg-sky-800 rounded bg-primary px-4 py-2 font-bold text-white"
        >
          Sign in with Google
        </button>
      </div>
    </Layout>
  )
}

export default SignInPage
