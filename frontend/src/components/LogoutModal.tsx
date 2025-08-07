import { AnimatePresence, motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useEffect } from "react";

interface LogoutModalProps {
    open: boolean,
    onClose: () => void;
    handleLogOut?: () => void
    onLogout?: () => void
}

function useHideIframes(isModalOpen: boolean) {
    useEffect(() => {
      const iframes = document.querySelectorAll('iframe');
  
      if (isModalOpen) {
        iframes.forEach((iframe) => {
          iframe.style.visibility = 'hidden'; // or display = 'none' if you want
        });
      } else {
        iframes.forEach((iframe) => {
          iframe.style.visibility = 'visible';
        });
      }
  
      // Cleanup on unmount (optional)
      return () => {
        iframes.forEach((iframe) => {
          iframe.style.visibility = 'visible';
        });
      };
    }, [isModalOpen]);
  }

export function LogoutModal(props: LogoutModalProps) {
    const navigate = useNavigate();
    useHideIframes(props.open);

    async function handleLogout() {
        try {
            await axiosInstance.post(`${BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
            localStorage.removeItem("accessToken");
            navigate("/"); // 👈 Redirect to Signup page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <AnimatePresence>
  {props.open && (
    <>
      {/* Background Overlay */}
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ pointerEvents: 'none' }} // IMPORTANT
      />

      {/* Modal Content */}
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[150]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-96 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ pointerEvents: 'auto' }} // IMPORTANT
        >
          <h2 className="text-xl font-bold mb-4 text-center">Confirm Logout</h2>
          <p className="text-gray-600 mb-6 text-center">Are you sure you want to log out?</p>
          <div className="flex justify-between">
            <button
              onClick={props.onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </div>
  );
}
