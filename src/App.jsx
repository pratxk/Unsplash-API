import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import './App.css';
import { fetchImagesWithKeyWord } from './util';
import { useState } from 'react';
import Form from './components/Form';
function App() {
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(1);
    const [transitionStyle, setTransitionStyle] = useState('transition-transform duration-500 ease-in-out');
    const [loading, setLoading] = useState(false); 

    const fetchTheValue = async (keyWord, checkbox, numberOfImages, orientation) => {
        setLoading(true);
        let fetchedImages = await fetchImagesWithKeyWord(keyWord, checkbox, numberOfImages, orientation);
        if (fetchedImages) {
            fetchedImages.splice(0, 0, fetchedImages[fetchedImages.length - 1]); // Prepend last image for circular navigation
            setImages(fetchedImages);
        }
        setLoading(false);
    };

    const slideRight = () => {
        if (index === images.length - 1) {
            setTransitionStyle(''); 
            setIndex(0);
            setTimeout(() => {
                setTransitionStyle('transition-transform duration-500 ease-in-out'); 
            }, 50); 
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const slideLeft = () => {
        if (index === 0) {
            setTransitionStyle('');
            setIndex(images.length - 1);
            setTimeout(() => {
                setTransitionStyle('transition-transform duration-500 ease-in-out'); 
            }, 50); 
        } else {
            setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    const getImageContainerClass = (orientation) => {
        return orientation === 'landscape'
            ? 'w-[60vw] h-[50vh] max-w-[800px] max-h-[500px]'  
            : 'w-[30vw] h-[80vh] max-w-[400px] max-h-[700px]'; 
    };

    return (
        <div className="min-h-screen flex flex gap-4 p-7 justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <Form fetchTheValue={fetchTheValue} />

            {loading ? (
                <div className="flex items-center justify-center">
                    <div className="loader">Loading...</div>
                </div>
            ) : images.length > 0 && (
                <div className={`relative group ${getImageContainerClass(images[index].orientation)} overflow-hidden rounded-lg `}>
                    <CiCircleChevLeft
                        onClick={slideLeft}
                        className="absolute top-1/2 left-0 transform text-3xl text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out cursor-pointer z-10"
                    />

                    <div
                        className={`flex ${transitionStyle}`}
                        style={{ transform: `translateX(-${index * 100}%)`, display: 'flex' }}
                    >
                        {images.map((image, idx) => (
                            <div key={idx} className="w-full h-full flex-shrink-0">
                                <img
                                    src={image.image}
                                    alt="Image"
                                    className={`w-full h-full ${image.orientation === 'portrait' ? 'object-contain' : 'object-cover'}`}
                                />
                            </div>
                        ))}
                    </div>

                    <CiCircleChevRight
                        onClick={slideRight}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl text-white opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 ease-in-out cursor-pointer z-10"
                    />
                </div>
            )}
        </div>
    );
}

export default App;
