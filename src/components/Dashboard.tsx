// This file includes the code for the Dashboard page=
import { useState } from "react";
import { auth } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { Cast } from "../interfaces/Cast.tsx";
import { checkForDuplicateTitle } from "../services/utils.tsx"
import { addCastToDb } from "../services/addCast.tsx";
import { generateCast } from "../services/generateCast.tsx"; 
import Modal from "./Modal.tsx";
import Loader from "./Loader.tsx";

const h1Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      delay: .3, 
      duration: 1
    }
  }
}

const buttonVariants = {
  whileHover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
  }
}

const kolaVariants = {
  whileHover: {
    scale: 2,
  }
}

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [cast, setCast] = useState<Cast>();
  const [isCastGenerated, setIsCastGenerated] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  function showSuccessfulSaveAlert() {
    alert('Your cast, ' + newTitle + ', has been saved!')
  }

  function showDuplicateTitleAlert() {
    alert('A cast with this title has already been saved... Please choose a unique title.');
  }

  function showEmptyTitleAlert() {
    alert('The cast title may not be empty.');
  }

  function showInvalidTitleAlert() {
    alert('The cast title may only contain letters')
  }
  
  const handleGenerateCast = () => {
    if (isCastGenerated) {
      setIsCastGenerated(false);
    }

    const castResult = generateCast();

    setCast(castResult);
    setIsCastGenerated(true);

    setShowModal(true);
  }


  const handleSaveCast = async (e) => {
    e.preventDefault();

    // Prevents submission of blank casts, blank titles, or duplicate titles to the database
    if (!cast) return;

    if (!newTitle) {
      showEmptyTitleAlert();
      return;
    }

    // Cast title can only use letters
    if (!newTitle.match(/^[a-zA-Z]+$/)) {
      showInvalidTitleAlert();
      return;
    }

    if (await checkForDuplicateTitle(newTitle)) {
      showDuplicateTitleAlert();
      
      return;

    } else {
      addCastToDb(cast, newTitle);
      showSuccessfulSaveAlert();
    }
  }

  return (
    <>
    <div className="mt-10">
      <motion.h1 className="text-3xl text-forrest text-opacity-50 font-serif mb-5 flex items-center justify-center"
        variants={ h1Variants }
        initial="initial"
        animate="animate"
        >Dashboard</motion.h1>
        {user && <h2 className="text-2xl text-mahogany font-sans-serif flex items-center justify-center">Welcome, {user.displayName}</h2>}
        {error && <h2 className="text-2xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
        {loading && <Loader />}
        <img className="object-scale-down h-64 w-64 mx-auto mt-10 mb-10" src="src/assets/favicon.png"/>
        <p className="text-mahogany font-sans-serif mt-10 mb-10 flex items-center justify-center">Would you like to divine something new?</p>
        <div className="mt-10 mb-10 flex items-center justify-center">
          <button className="bg-forrest text-ivory font-sans-serif rounded-xl hover:bg-forrest/60 px-5 py-5 shadow-md" onClick={() => handleGenerateCast()}>Cast</button>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <div className="">
            {cast && <p className="text-xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Odu:&nbsp;</b>{cast.odu}</p>}
            {cast && <p className="text-xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Date:&nbsp;</b>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cast.timestamp)}</p>}
            {cast && <p className="text-xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Answer:&nbsp;</b>{cast.answer}</p>}
            {cast && <p className="text-xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Interpretation:&nbsp;</b>{cast.interpretation}</p>}
          </div>
          <div className="mx-auto mt-10 mb-5 h-32 w-32 flex items-center justify-center">
            {cast && <motion.img className="object-scale-down h-64 w-64 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.maleObi1}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.maleObi2}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.femaleObi1}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.femaleObi2}`} />}
          </div>
          <form onSubmit={(e) => handleSaveCast(e) } className="font-sans-serif mt-20 mb-20 flex flex-col items-center justify-center">
            <motion.input type="text" className="text-2xl border-2 border-forrest/60 rounded" 
              variants={buttonVariants}
              whileHover="whileHover"
              placeholder=" add a title..." value={ newTitle } onChange={(e) => setNewTitle(e.target.value)} autoFocus />
            <div className="mt-10 mb-10 flex items-center justify-center">
              <motion.button className="bg-forrest text-ivory font-sans-serif rounded-xl hover:bg-forrest/60 px-5 py-5 shadow-md"
                variants={ buttonVariants }
                whileHover="whileHover"
                >Save</motion.button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Dashboard