import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import { useState } from 'react';

import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useWindowDimensions from './useWindowDimensions';
import { makeImagePath } from '../utils';
import Detail from './Detail';
import TvDetail from './TvDetail';

const Sliders = styled.div`
    position: relative;
    margin-top: 0px;

    h2 {
        color: ${(props) => props.theme.white.lighter};
        padding: 0 10px;
        margin: 10px 0px;
        font-size: 12px;
        font-weight: 500;
    }
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
    padding: 0 30px;
    width: 100%;
    position: absolute;
    button {
        background-color: rgba(255, 255, 255, 0.7);
        border: none;
    }
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
    background-color: white;
    border-radius: 2px;
    height: 120px;
    background-image: url(${(props) => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    color: white;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    padding: 20px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: -50px;
    h4 {
        font-size: 12px;
    }
`;

const HandlePrev = styled.button`
    width: 30px;
    height: 120px;
    left: 0;
    z-index: 3;
    position: absolute;
    border: none;
    background-color: rgba(255, 255, 255, 0.4);
`;

const HandleNext = styled.button`
    width: 30px;
    height: 120px;
    right: 0;
    z-index: 3;
    position: absolute;
    border: none;
    background-color: rgba(255, 255, 255, 0.4);
`;

interface ISlider {
    data: any;
    type?: string;
    category?: string;
}

function TvSlider({ data, type, category }: ISlider) {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const bigMovieMatch: PathMatch<string> | null = useMatch(
        `/tv/${category}/:movieId`,
    );
    console.log(data);

    const increaseIndex = () => {
        if (data) {
            if (leaving) {
                return;
            }
            toggleLeaving();
            const totalMovies = data?.results.length - 1;

            const maxIndex = Math.floor(totalMovies / sliderOffset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };

    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };

    const onBoxClicked = (movieId: number) => {
        navigate(`/tv/${category}/${movieId}`);
    };
    const windowWidth = useWindowDimensions();

    const sliderOffset = 5;

    const BoxVars = {
        normal: { scale: 1 },
        hover: {
            scale: 1.3,
            y: -50,
            transition: { delay: 0.3, type: 'tween' },
        },
    };

    const infoVars = {
        hover: {
            opacity: 1,
            transition: { delay: 0.2, type: 'tween' },
        },
    };

    return (
        <>
            <Sliders>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    <h2>{type}</h2>
                    <HandlePrev />

                    <Row
                        initial={{ x: windowWidth + 5 }}
                        animate={{ x: 0 }}
                        exit={{ x: -windowWidth - 5 }}
                        transition={{ type: 'tween', duration: 1 }}
                        key={index}
                    >
                        {data?.results
                            .slice(1)
                            .slice(
                                sliderOffset * index,
                                sliderOffset * index + sliderOffset,
                            )
                            .map((movie: any) => (
                                <Box
                                    layoutId={movie.id + ''}
                                    key={movie.id}
                                    variants={BoxVars}
                                    whileHover='hover'
                                    initial='normal'
                                    transition={{ type: 'tween' }}
                                    onClick={() => onBoxClicked(movie.id)}
                                    $bgPhoto={makeImagePath(
                                        movie.backdrop_path,
                                        'w500',
                                    )}
                                >
                                    <Info variants={infoVars}>
                                        <h4>{movie.name}</h4>
                                    </Info>
                                </Box>
                            ))}
                    </Row>
                    <HandleNext onClick={increaseIndex} />
                </AnimatePresence>
            </Sliders>
            {bigMovieMatch ? (
                <AnimatePresence>
                    <TvDetail data={data} category={category} />
                </AnimatePresence>
            ) : null}
        </>
    );
}
export default TvSlider;
