import { useState, useEffect } from "react";
import axios from "axios";
import "./wishes.css";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Wishes() {
    const [wishes, setWishes] = useState([]);
    const [successMsg, setSuccessMsg] = useState("")
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", message: "", image: null });

    useEffect(() => {
        axios.get("https://birthday-backend-494w.onrender.com/api/wishes")
            .then(res => setWishes(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e) {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("message", formData.message);
        if (formData.image) {
            data.append("image", formData.image);
        }

        axios.post("https://birthday-backend-494w.onrender.com/api/wishes", data)
            .then(res => {
                setWishes(prev => [...prev, res.data]);
                setFormData({ name: "", message: "", image: null });
                setSuccessMsg("Wish sent successfully! 🎉");
                setTimeout(() => setSuccessMsg(""), 3000); // fade after 3 seconds
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <div className="wishes-container">
                <h2>Send A Birthday Wish To Ravikiran 🎉</h2>
                {successMsg && <p className="success-message">{successMsg}</p>}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button type="submit">Send Wish</button>
                </form>
            </div>

            <div className="fetched-wishes">
                <h2>All Wishes</h2>
                {loading ? (
                    <div className="spinner">
                        <p>Waking up the server... ⏳ It may take upto few minutes</p>
                    </div>    
                ) : (
                    <ul className="wish-list">
                        {wishes.map(wish => (
                            <li className="wish-item" key={wish.id}>
                                <strong>{wish.name}</strong>: {wish.message}
                                {wish.imageUrl && (
                                    <div>
                                        <img src={wish.imageUrl} alt="Wish" className="wish-image" />
                                    </div>
                                )}
                            </li>
                        ))}
                     </ul>
                )
                }
                
            </div>
        </>
    );
}


