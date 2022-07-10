import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';

import styled from 'styled-components';
import {
    getLatestMovies,
    getMovies,
    getTopRateMovies,
    getTvAiring,
    getTvTopPopular,
    getTvTopRated,
    getUpCominngMovies,
    IGetLatestMovies,
    IGetMoviesResult,
    IGetTopMoviesResult,
} from '../api';
import Slider from '../Components/Slider';
import TvSlider from '../Components/TvSlider';
import useWindowDimensions from '../Components/useWindowDimensions';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
    background-color: black;
    height: 200vh;
`;

const Loader = styled.div`
    height: 20vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 50vh;
    color: white;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
        url(${(props) => props.bgPhoto});
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding: 40px;
`;

const Title = styled.h2`
    font-size: 36px;
    margin-bottom: 10px;
    font-weight: 600;
`;

const Overview = styled.p`
    font-size: 12px;
    width: 40%;
    position: relative;
`;

const SliderWrapper = styled.div`
    margin-top: 150px;
`;

const LateMovie = styled.div`
    margin-top: 150px;

    h2 {
        margin-left: 10px;
        font-size: 14px;
        color: white;
    }
`;

function Tv() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ['tv', 'Airing'],
        getTvAiring,
    );

    const { data: topTvData, isLoading: topTvLoading } =
        useQuery<IGetTopMoviesResult>(['tv', 'toptv'], getTvTopRated);

    const { data: popularTvData, isLoading: popularTvLoading } =
        useQuery<IGetMoviesResult>(['tv', 'populartv'], getTvTopPopular);

    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        bgPhoto={makeImagePath(
                            data?.results[0].backdrop_path || '',
                        )}
                    >
                        <Title>{data?.results[0].name}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <TvSlider
                        data={data}
                        type='새로 올라온 콘텐츠'
                        category='new'
                    />
                    <SliderWrapper>
                        <TvSlider
                            data={topTvData}
                            type='지금 뜨는 콘텐츠'
                            category='top'
                        />
                    </SliderWrapper>
                    <SliderWrapper>
                        <TvSlider
                            data={popularTvData}
                            type='인기있는 콘텐츠'
                            category='up'
                        />
                    </SliderWrapper>
                </>
            )}
        </Wrapper>
    );
}
export default Tv;
