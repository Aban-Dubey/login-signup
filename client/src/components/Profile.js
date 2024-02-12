import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import styles from '../styles/Username.module.css';
import useFetch from '../hooks/fetch.hooks.js';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { profileValidate } from '../helper/validate.js';
import convertToBase64 from '../helper/convert.js';
import { updateUser } from '../helper/helper.js';

function Profile() {

    const[file, setFile] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: apiData?.firstName || '',
            lastName: apiData?.lastName || '',
            mobile: apiData?.mobile || '',
            email: apiData?.email || '',
            address: apiData?.address || ''
        },
        enableReinitialize: true,
        validate: profileValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, {profile: file || apiData?.profile ||  ''});
            let updatePromise = updateUser(values);

            toast.promise(updatePromise, {
                loading: "Updating...",
                success: <b>Update Successful</b>,
                error: <b>Could not update</b>
            });
        }
    })

    //formik does not support file upload so we need to create this file handler
    const onUpload = async e =>{
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    //Logout user component
    function userLogout(){
        localStorage.removeItem('token');
        navigate('/');
    }

    if(isLoading) return <h1 className='text-2xl font-bold'>is loading</h1>;
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass} style={{height: "90%", width: "45%"}}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Profile</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                            You can update the details.
                        </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                        <label htmlFor='profile'>
                            <img src={file || apiData?.profile ||  avatar} className={styles.profile_img} alt='avatar' />
                        </label>

                        <input onChange={onUpload} type='file' id='profile' name='profile'/>
                        </div>
                        <div className='textbox flex flex-col items-center gap-4'>
                            <div className='name flex w-3/4 gap-10'>
                                <input {...formik.getFieldProps('firstName')} className={styles.textbox} type='text' placeholder='Fist Name' />
                                <input {...formik.getFieldProps('lastName')} className={styles.textbox} type='text' placeholder='Last Name' />  
                            </div>
                            <div className='name flex w-3/4 gap-10'>
                                <input {...formik.getFieldProps('mobile')} className={styles.textbox} type='text' placeholder='Mobile No.' />
                                <input {...formik.getFieldProps('email')} className={styles.textbox} type='text' placeholder='Email' />  
                            </div>
                            <input {...formik.getFieldProps('address')} className={styles.textbox} type='text' placeholder='Address' />
                            <button type='submit' className={styles.btn}>Update</button>
                        </div>
                        <div className='text-center py-4'>
                            <span className='text-gray-500'>Come back later? 
                                <button onClick={userLogout} className='text-red-500' to='/'>Logout Now</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;