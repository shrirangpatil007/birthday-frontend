import { useState, useEffect } from "react"
import axios from "axios"
import "./gallery.css"


export default function Gallery() {
    const [images, setImages] = useState([]);    

    useEffect(() => {
        axios.get("https://birthday-backend-494w.onrender.com/api/wishes")
        .then(res => {
            const images = res.data
                .filter(wish => wish.imageUrl)
                .map(wish => ({url: wish.imageUrl, name: wish.name}));
            setImages(images)
        });
    }, []);

    return (
        <div className="gallery-wall">
            <h2>Gallery Wall 🖼️</h2>
            <div className="gallery-grid">
                {images.map((img, index) => (
                    <div key={index} className="gallery-item">
                        <img src={img.url} alt={`wish by ${img.name}`} />
                        <p>{img.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
