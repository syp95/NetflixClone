import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import React, { useState } from 'react';

import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useWindowDimensions from './useWindowDimensions';
import { makeImagePath } from '../utils';
import { getDetail, IMovie } from '../api';
import { useQuery } from 'react-query';

const Overlay = styled(motion.div)`
    position: fixed;
    z-index: 99;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)<{ $scrollY: number }>`
    position: absolute;
    z-index: 99;
    width: 95vw;
    height: 90vh;
    background-color: ${(props) => props.theme.black.darker};
    border-radius: 3px;
    top: ${(props) => props.$scrollY + 30}px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    img {
        width: 100%;
        height: 400px;
        border-radius: 3px;
        object-fit: cover;
        object-position: center top;
        mask-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3));
    }
    h3 {
        color: ${(props) => props.theme.white.lighter};
        font-size: 36px;
        font-weight: 600;
        position: absolute;
        top: 200px;
        left: 50px;
    }
    button {
        position: absolute;
        color: white;
        font-size: 16px;
        border: none;
        z-index: 2;
        background-color: ${(props) => props.theme.black.lighter};
        width: 35px;
        height: 35px;
        top: 15px;
        right: 15px;
        border-radius: 50%;
    }
`;

interface IDetailGenres {
    id: number;
    name: string;
}
interface IMovieDetail {
    genres: IDetailGenres[];
}

function Detail({ data, category }: any) {
    const navigate = useNavigate();
    const bigMovieMatch: PathMatch<string> | null = useMatch(
        `/movies/${category}/:movieId`,
    );
    const { data: detailData, isLoading: detailLoading } =
        useQuery<IMovieDetail>(
            ['movies', `detail_${bigMovieMatch?.params.movieId}`],
            () => getDetail(bigMovieMatch?.params.movieId),
        );

    const { scrollY } = useViewportScroll();

    const onModalOffClick = () => {
        navigate('/');
    };

    const clickedMovie =
        bigMovieMatch?.params.movieId &&
        data?.results.find((movie: IMovie) => {
            return String(movie.id) == bigMovieMatch.params.movieId;
        });

    return (
        <>
            {bigMovieMatch ? (
                <>
                    <Overlay
                        onClick={onModalOffClick}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    ></Overlay>
                    <BigMovie
                        layoutId={bigMovieMatch.params.movieId}
                        $scrollY={scrollY.get()}
                    >
                        {clickedMovie && (
                            <>
                                <button onClick={onModalOffClick}>X</button>
                                <img
                                    src={makeImagePath(
                                        clickedMovie.backdrop_path,
                                    )}
                                />

                                <h3>{clickedMovie.title}</h3>
                                <p
                                    style={{
                                        color: 'white',
                                        marginTop: '10px',
                                        margin: '20px',
                                    }}
                                >
                                    Genre : {detailData?.genres[0].name},
                                    {detailData?.genres[1].name}
                                </p>
                                <p
                                    style={{
                                        color: 'white',

                                        margin: '20px',
                                    }}
                                >
                                    {clickedMovie.overview}
                                </p>
                            </>
                        )}
                    </BigMovie>
                </>
            ) : null}
        </>
    );
}

export default React.memo(Detail);
