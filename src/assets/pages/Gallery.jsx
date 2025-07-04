import { useState, useEffect } from "react"
import axios from "axios"
import "./gallery.css"


export default function Gallery() {
    const [images, setImages] = useState([]);    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://birthday-backend-494w.onrender.com/api/wishes")
        .then(res => {
            const images = res.data
                .filter(wish => wish.imageUrl)
                .map(wish => ({url: wish.imageUrl, name: wish.name}));
            setImages(images)
        }).finally(() => setLoading(false));
    }, []);

    return (
        <div className="gallery-wall">
            <h2>Gallery Wall 🖼️</h2>
            {loading ? (
                <div className="spinner">
                    <p>Waking up the server... ⏳ It may take upto few minutes</p>
                </div>
                ): (
                <div className="gallery-grid">
                    {images.map((img, index) => (
                        <div key={index} className="gallery-item">
                            <img src={img.url} alt={`wish by ${img.name}`} />
                            <p>{img.name}</p>
                        </div>
                    ))}
                </div>
                )
            }
            
        </div>
    );
}
