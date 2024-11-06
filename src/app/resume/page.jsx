"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'

function Resume() {
    const [data, setData] = useState([]);
    const [movie, setMovie] = useState("dragon ball super");
    const [failed, setFailed] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const fetchData = async (num) => {
        setLoading(true);
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=526ad75264a03e430f8b5d27573eeebb&query=${movie}&page=${num}`);
            const result = await res.json();
            if (result.results && result.results.length > 0) {
                console.dir(result.results);
                setData((prevData) => {
                    const newData = [...prevData, ...result.results];
                    localStorage.setItem("movies", JSON.stringify(newData));
                    return newData;
                });
                setFailed("");
            } else {
                throw new Error("No results found");
            }
        } catch (error) {
            console.log("Data not fetched");
            setFailed("No More Results");
            const savedMovies = localStorage.getItem("movies");
            if (savedMovies) {
                setData(JSON.parse(savedMovies));
            }
        } finally {
            setLoading(false);  // Ensure loading is set to false in both success and failure cases
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMovie(input);
        setPage(1);
        setData([]);
        setFailed("");
        setLoading(true); // Start loading before fetching
        fetchData(1).finally(() => setLoading(false)); // End loading after fetch
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4">
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search for movies..."
                        className="flex-grow px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type='submit'
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </div>
            </form>

            <center>
            <div>
                <strong className='text-green-600'>Search Result: </strong>   {movie}
            </div>
            </center>
            <br />
            {failed && <center className='font-bold text-2xl text-red-500 mb-4'>{failed}</center>}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((movie, key) => (
                        <Link href={`./resume/${movie.id}`} key={key}>
                            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                                <h1 className="text-xl font-semibold mb-2"><strong className='text-green-600'>Name:</strong>{movie.original_title}</h1>
                                <p className="text-sm mb-4"><strong className='text-green-600'>StoryLine:</strong> <br />{movie.overview.slice(0,200) }....</p>
                                {
                                    !movie.poster_path ? (
                                        <Image
                                            src="/nomovies.jpg"
                                            width={300}
                                            height={1}
                                            alt={movie.original_title}
                                            className="rounded"
                                        />
                                    )
                                        :
                                        (
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                width={300}
                                                height={1}
                                                alt={movie.original_title}
                                                className="rounded"
                                            />

                                        )
                               }
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <center>
                {!input && (
                    <button
                        onClick={() => setPage(page + 1)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Load More
                    </button>
                )}
                {loading && <p className="text-center">Loading more...</p>}
            </center>
        </div>
    )
}

export default Resume;





{/* {data && <div>
    {data.original_title}
</div>} */}

{/* <div>
    {data ? <div>{data.original_title}</div> : <p>Loading...</p>}
</div> */}

// IIFE
    // (async () => {
    //     if (!data) { 
    //         const res = await fetch("https://api.themoviedb.org/3/search/movie?api_key=526ad75264a03e430f8b5d27573eeebb&query=movies");
    //         const fetchedData = await res.json();
    //         setData(fetchedData.results[2]); 
    //         console.log(fetchedData.results[2]);
    //         localStorage.setItem("movie",fetchedData.results[1])
    //     }
    // })();
