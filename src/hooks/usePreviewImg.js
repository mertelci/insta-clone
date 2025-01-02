import React, { useState } from 'react'
import useShowToast from './useShowToast'
const usePreviewImg = () => {

    const [selectedFile, setselectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB



    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "Image file is too large", "error")
                setselectedFile(null)
                return
            }
            const reader = new FileReader();

            reader.onloadend = () => {
                setselectedFile(reader.result)
            }
            reader.readAsDataURL(file)
        }
        else {
            showToast("Error", "Invalid file type", "error")
            setselectedFile(null)
            return
        }
    }
    return { selectedFile, handleImageChange, setselectedFile }
}

export default usePreviewImg