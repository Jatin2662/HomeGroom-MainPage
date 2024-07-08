


import React, { useState } from 'react';
import axios from 'axios';
import './Services.css';


function Services() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:3001/Services', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
        } catch (error) {
            // console.error('Error uploading image:', error);
            alert(error.response.data.error);
        }

        setTitle('');
        setImage(null);
        setPreviewImage(null);

        document.getElementById('file-input').value = null;
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        const imageUrl = URL.createObjectURL(selectedImage);
        setPreviewImage(imageUrl);
    };

    return (
        <section className="mainBox1">
            <div>
                <h1>Upload an Image</h1>
            </div>
            <section className="form">
                <form onSubmit={handleSubmit} method="POST">
                    <div className="info">
                        <input
                            type="text"
                            placeholder="Image Title"
                            value={title}
                            className="fields"
                            onChange={handleTitleChange}
                            required
                        />
                        <div className="img-fields">
                        {previewImage && <img src={previewImage} alt="Preview" />}
                        {/* {previewImage ? <img src={previewImage} alt="Preview" /> : null} */}
                            <input
                                type="file"
                                id="file-input"
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                            />
                        </div>
                    </div>
                    <div className="btn-sub">
                        <button type="submit">Upload</button>
                    </div>

                </form>
            </section>
        </section>
    );
}

export default Services;