import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5"
import { Link } from "react-router-dom";

function MobileMenu({ navLinks, close }) {
  const [animation, setAnimation] = useState(false);
    
  React.useEffect(() => {
    setAnimation(true);
    window.addEventListener("resize", (e) => {
        if (e.target.innerWidth >= 640) {
            close();
        }
    })

    return () => {
        window.removeEventListener("resize", () => {})
    }
  }, [close]);

  return (
    <div>
        <div className="top-0 1-0 h-screen w-full backdrop-blur-sm bg-forrest bg-opacity-60 fixed inset-0"></div>
        <div className="fixed inset-0 top 1-0 p-5">
            <div className={`w-full bg-ivory rounded-xl p-5 transition-all ${animation ? "scale-100" : "scale-95"}`}>
                <div className="flex items-center justify-between">
                    <h1>Menu</h1>
                    <IoCloseOutline className="w-7 h-7 hover:scale-110 transition-all cursor-pointer" onClick={() => {close()}}/>
                </div> 
                <div className="mt-5 divide-y">
                {navLinks.map(({ text, path}, index) => {
                        return (
                            <>
                            <Link className="block py-2 text-forrest" key={index} to={path}>{text}</Link>
                            </>
                    );
                })}
            </div> 
            </div>
        </div>
    </div>
  )
}

export default MobileMenu