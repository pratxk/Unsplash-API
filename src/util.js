import axios from "axios";

export const fetchImagesWithKeyWord = async (keyWord, random, numberOfImages, orientation) => {
    const keyWordImages = {
        query: keyWord,
        per_page: numberOfImages,
        page: 1,
        orientation: orientation, // Added orientation here
    };
    const randomImages = {
        count: numberOfImages,
        orientation: orientation, // Added orientation here
    };

    const keyWordUrl = "https://api.unsplash.com/search/photos";
    const randomUrl = "https://api.unsplash.com/photos/random";

    const accessKey = 'djABoqn84425wB9tD7hqwvwHti7X6-7sCuhkUpyBzaQ';

    try {
        const response = await axios.get(`${random ? randomUrl : keyWordUrl}`, {
            params: random ? randomImages : keyWordImages,
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        });

        const images = random ? response.data : response.data.results;

        return images.map((image) => {
            return {
                image: image.urls.regular,  // Use the regular size for better performance
                id: image.id,
                orientation: image.width > image.height ? 'landscape' : 'portrait' // Determine image orientation
            };
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        return null;
    }
};
