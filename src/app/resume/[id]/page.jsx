"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=526ad75264a03e430f8b5d27573eeebb&append_to_response=credits,videos`);
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <>
        
        <div className="bg-gray-900 text-white  p-8">
            <div className="max-w-6xl mx-auto ">
                <h1 className="text-4xl font-bold mb-6">{movie.title}</h1>
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/3">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            width={400}
                            height={600}
                            alt={movie.title}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="lg:w-2/3">
                        <p className="text-xl mb-6 italic">{movie.tagline}</p>
                        <p className="text-lg mb-6">{movie.overview}</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p><strong>Release Date:</strong> {movie.release_date}</p>
                                <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10</p>
                                <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                                <p><strong>Status:</strong> {movie.status}</p>
                            </div>
                            <div>
                                <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
                                <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
                                <p><strong>Original Language:</strong> {movie.original_language}</p>
                                <p><strong>Popularity:</strong> {movie.popularity.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Genres</h2>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map(genre => (
                                    <span key={genre.id} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Production Companies</h2>
                            <div className="flex flex-wrap gap-4">
                                {movie.production_companies.map(company => (
                                    <div key={company.id} className="flex items-center bg-gray-800 rounded-lg p-2">
                                        {company.logo_path && (
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                width={50}
                                                height={50}
                                                alt={company.name}
                                                className="mr-2"
                                            />
                                        )}
                                        <span>{company.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {movie.credits && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-2">Top Cast</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {movie.credits.cast.map(actor => (
                                        <div key={actor.id} className="text-center">
                                            {!actor.profile_path ? (
                                                <Image
                                                    src="/user.jpg"
                                                    width={100}
                                                    height={150}
                                                    alt={actor.name}
                                                    className="rounded-lg mx-auto mb-2"
                                                />
                                            ) : (
                                                
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                    width={100}
                                                    height={150}
                                                    alt={actor.name}
                                                    className="rounded-lg mx-auto mb-2"
                                                />
                                            ) }
                                            <p className="font-semibold">{actor.name}</p>
                                            <p className="text-sm text-gray-400">{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {movie.videos && movie.videos.results.length > 0 ?  (
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Trailer</h2>
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full rounded-lg"
                                        ></iframe>
                                    </div>
                            </div>
                        ) : (
                            <center>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                <div className='text-white text-4xl font-bold'>
                                    No Trailer Found
                                </div>
                                </center>
                        )}
                    </div>
                </div>
            </div>
            </div>
            </>
    );
}