// This file provides the codes for the Settings menu that appears when the user clicks on the gear icon in the top right corner
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { IoCloseOutline } from "react-icons/io5"
import { auth } from "./../../GoogleProvider.tsx";
import { deleteUser } from "firebase/auth";
import Loader from './Loader.tsx';

function SettingsMenu ({ close }) {
    const [animation, setAnimation] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // Deletes the logged in user or displays error message
    const handleDeleteAccount = () => {
        if (!user) {
            console.log("No User to delete");
        } else {
            deleteUser(user).then(() => {
                // Successfull Logout
                navigate('/');
                console.log("Deleted user successfully")
              }).catch((error) => {
                // Logout unsuccessfull
                console.log("Delete User Error: " + error);
              })
        }
    }

    React.useEffect(() => {
        setAnimation(true);
      }, [close]);

    return (
    <div>
        <div className="top-0 1-0 h-screen w-full backdrop-blur-sm bg-forrest bg-opacity-60 fixed inset-0"></div>
        <div className="fixed inset-0 top 1-0 p-5">
            <div className={`w-full bg-ivory rounded-xl p-5 transition-all ${animation ? "scale-100" : "scale-95"}`}>
                <div className="flex items-center justify-between">
                    <h1 className="text-forrest font-serif">Settings</h1>
                    <IoCloseOutline className="text-forrest w-7 h-7 hover:scale-110 transition-all cursor-pointer" onClick={() => {close()}}/>
                </div> 
                <div className="mt-5">
                    <p className='flex items-center justify-center'>Would you like to delete your account?</p>
                    <div>
                    {error && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
                    {loading && <Loader/>}
                    </div>

                    <div className='mt-5 flex items-center justify-center'>
                        <motion.button whileHover={{ 
                            scale: 1.1,
                            textShadow: "0px 0px 8px rgb(255, 255, 255)",
                            boxShadow: "0px 0px 8px rgb(255, 255, 255)",
                            }} className='bg-forrest rounded-md text-ivory font-"sans-serif" hover:bg-forrest/60 px-5 py-5' onClick={handleDeleteAccount}
                            >Delete Account</motion.button>
                    </div>
                </div> 
        </div>
        </div>
    </div>
    )
}

const Settings = ()  => {
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  return (
    <>
    <div className="mt-5 mb-0 flex justify-end w-full inline">
        <button className="bg-white text-forrest font-serif shadow-md px-5 py-2 rounded-full" onClick={() => { setSettingsMenuOpen(true); } }><img src="src/assets/settings.png" /></button>
    </div>
    <div>
    { settingsMenuOpen ? (<SettingsMenu close={() => setSettingsMenuOpen(false)} />) : (<></>) }
    </div>
    </>

 )
}

export default Settings