import {useSelector} from 'react-redux';
import { useRef, useState ,useEffect} from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from "../firebase";
import { updateUserStart , updateUserFailure, updateUserSuccess } from '../redux/user/userSlice';
import {useDispatch } from 'react-redux';


export default function Profile() {
    const {currentUser} = useSelector((state) => state.user);
    const fileRef = useRef();
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadErr, setFileUploadErr] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    

    //firebase storage rules 
    // allow read;
    // allow write:if
    // request.resource.size < 2 * 1024 * 1024 &&
    // request.resource.contentType.matches('image/.*')

    useEffect(()=>{
       if(file){
        handleFileUpload(file);
       }

    },[file]);

    const handleFileUpload = (file)=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef , file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
      
        (error) => {
            setFileUploadErr(true);
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
               setFormData({...formData ,avatar:downloadURL});
            })
        },
    )
    }

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.id]:e.target.value});
    }
   
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        dispatch(updateUserStart());
        const res = await fetch(`api/user/update/${currentUser._id}`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(formData),

        });
        const data = await res.json();
        if(data.success === false){
            dispatch(updateUserFailure(data.message));
            return ;
        }
        dispatch(updateUserSuccess(data));

      } catch (error) {
        dispatch(updateUserFailure(error.message));
      }
    }

    return (
        <div className='p-4 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-9">Profile</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <input onChange={(e) => setFile(e.target.files[0])}
                 type="file" ref={fileRef} hidden accept='image/*'/>

                <img onClick={()=> fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4 bg-red-400' alt="profile" src={formData.avatar || decodeURIComponent(currentUser?.avatar)} />

                <p className='text-sm self-center'>
                     {fileUploadErr ? (
                     <span className="text-red-600">Error Image Upload (Image must be less than 2 mb)</span>
                     ) : filePerc > 0 && filePerc < 100 ? (
                     <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                     ) : filePerc === 100 ? (
                     <span className="text-green-700">Image Uploaded Successfully</span>
                     ) : (
                     ""
                     )}
                </p>


                <input className='border border-slate-300 p-3 rounded-lg bg-white' type="text" placeholder='Username' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
                
                <input className='border border-slate-300 p-3 rounded-lg bg-white' type="email" placeholder='Email'  id='email'  defaultValue={currentUser.email} onChange={handleChange}/>
                
                <input className='border border-slate-300 p-3 rounded-lg bg-white' type="password" placeholder='Password' id='password' onChange={handleChange}/>

                <button className='bg-slate-700 rounded-lg text-white uppercase p-3 font-semibold hover:opacity-95 disabled:opacity-80'>update</button>
            </form>

            <div className='flex justify-between mt-5 p-2'>
                <span className='text-red-700 cursor-pointer font-medium '>Delete Account</span>
                <span className='text-red-700 cursor-pointer font-medium '>Sign out</span>
            </div>
        </div>
    )
}