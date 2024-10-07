import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import './App.css';
import { fetchImagesWithKeyWord } from './util';
import { useState } from 'react';
import Form from './components/Form';

function App() {
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(1);
    const [transitionStyle, setTransitionStyle] = useState('transition-transform duration-500 ease-in-out');

    const fetchTheValue = async (keyWord, checkbox, numberOfImages) => {
        let images = await fetchImagesWithKeyWord(keyWord, checkbox, numberOfImages);
        images.splice(0, 0, images[images.length - 1]); // Prepend the last image to facilitate circular navigation
        setImages(images);
        console.log(images);
    };

    const slideRight = () => {
        if (index === images.length - 1) {
            setTransitionStyle(''); // Disable transition
            setIndex(0); // Go back to the first image
            setTimeout(() => {
                setTransitionStyle('transition-transform duration-500 ease-in-out'); // Re-enable transition after setting the index
            }, 50); // Slight delay to allow the change to take effect
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const slideLeft = () => {
        if (index === 0) {
            setTransitionStyle(''); // Disable transition
            setIndex(images.length - 1); // Go to the last image
            setTimeout(() => {
                setTransitionStyle('transition-transform duration-500 ease-in-out'); // Re-enable transition after setting the index
            }, 50); // Slight delay to allow the change to take effect
        } else {
            setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <Form fetchTheValue={fetchTheValue} />

            <div className="relative group w-[60vw] h-[100vh] border border-black overflow-hidden rounded-lg shadow-lg">
                <CiCircleChevLeft
                    onClick={slideLeft}
                    className="absolute top-1/2 left-0 transform text-3xl text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out cursor-pointer z-10"
                />

                <div
                    className={`flex ${transitionStyle}`}
                    style={{ transform: `translateX(-${index * 100}%)`, display: 'flex' }}
                >
                    {images.length > 0 &&
                        images.map((image, idx) => (
                            <div key={idx} className="w-full h-full flex-shrink-0">
                                <img
                                    src={image.image}
                                    alt="Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                </div>

                <CiCircleChevRight
                    onClick={slideRight}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl text-white opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 ease-in-out cursor-pointer z-10"
                />
            </div>
        </div>
    );
}

export default App;
