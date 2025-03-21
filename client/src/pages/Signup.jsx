import { Link } from 'react-router-dom'

export default function Signup() {
    return (
       <div className="p-5 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold my-7 text-center">Sign Up</h1>
        <form className="flex flex-col gap-4">
            <input className="border bg-white border-zinc-300 p-3 rounded-lg " type="text" placeholder="username"
            id="username"/>
             <input className="border bg-white border-zinc-300 p-3 rounded-lg " type="email" placeholder="example@email.com"
            id="email"/>
             <input className="border bg-white border-zinc-300 p-3 rounded-lg " type="password" placeholder="password"
            id="password"/>
            <button className="bg-slate-700 text-white p-3 rounded-lg font-semibold uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>

        </form>
        <div className='flex gap-2 py-3 justify-center'>
            <p className='font-medium'>Have an account?</p>
            <Link to={'/sign-in'}>
               <span className='text-blue-700 font-semibold'>Sign in</span>
            </Link>
        </div>
       </div>
    )
}