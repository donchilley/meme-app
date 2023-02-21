import React, { useRef, useState } from 'react'

interface uploaderProps {
    triggerUploadPopup: Function,
    submitImage: Function
}

function ImageUploader(props: uploaderProps) {

    const { triggerUploadPopup, submitImage } = props

    const [image, setImage] = useState("");

    const imageRef = useRef<HTMLInputElement>(null)

    const [errors, setErrors] = useState<string[]>([])

    function handleSubmit(e: any) {
        e.preventDefault();
        var errors = []
        if (!image) {
            errors.push("Please select an image to upload.")
        }
        if (imageRef.current) {

            setErrors(errors)
            if (errors.length === 0) {
                submitImage(image);
                imageRef.current.value = ''
                close();
            }
        }

    }

    function close() {
        //e.preventDefault()
        triggerUploadPopup(false)
        setErrors([])
    }

    function pickImage(e: any) {
        if (e.target) {
            setImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (

        <div className='uploader-content'>
            <span style={{ padding: "5px", position: "fixed" }}>Upload An Image</span>
            <form className='form' onSubmit={handleSubmit}>
                <div className='file-upload-section'>
                    <input ref={imageRef} name="image" id="image" accept="image/*" type="file" onChange={(e) => pickImage(e)}></input>
                </div>
                {
                    errors.length > 0 && errors.map((error, index) => {
                        return <p key={index} style={{ color: 'red' }}>{error}</p>
                    })
                }
                <div className='button-section'>
                    <button onClick={() => close()}>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ImageUploader