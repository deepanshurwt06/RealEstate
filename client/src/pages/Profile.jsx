import {useSelector} from 'react-redux';

export default function Profile() {
    const {currentUser} = useSelector((state) => state.user);
    return (
        <div className='p-4 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-9">Profile</h1>

            <form className='flex flex-col gap-5'>
                <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4 bg-red-400' src="{currentUser.avatar}" alt="profile" />

                <input className='border border-slate-300 p-3 rounded-lg bg-white' type="text" placeholder='Username' id='username'/>
                
                <input className='border border-slate-300 p-3 rounded-lg bg-white' type="email" placeholder='Email'  id='email'/>
                
                <input className='border border-slate-300 p-3 rounded-lg bg-white' type="text" placeholder='Password' id='password'/>

                <button className='bg-slate-700 rounded-lg text-white uppercase p-3 font-semibold hover:opacity-95 disabled:opacity-80'>update</button>
            </form>

            <div className='flex justify-between mt-5 p-2'>
                <span className='text-red-700 cursor-pointer font-medium '>Delete Account</span>
                <span className='text-red-700 cursor-pointer font-medium '>Sign out</span>
            </div>
        </div>
    )
}