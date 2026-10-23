import { useEffect, useState } from "react";

const useFetchPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const res = await fetch("https://picsum.photos/v2/list?page=1&limit=30");
                if (!res.ok) {
                    throw new Error(`Failed to fetch: HTTP error ${res.status}`);
                }

                const data = await res.json();
                setPhotos(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    return { photos, loading, error };
};

export default useFetchPhotos;