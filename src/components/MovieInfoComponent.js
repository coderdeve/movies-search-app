import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { API_KEY } from "../App";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: center;
    border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
    object-fit: cover;
    height: 352px;
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

const MovieName = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-transform: capitalize;
`;

const MovieInfo = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: black;
    overflow: hidden;
    margin: 4px 0;
    text-transform: capitalize;
    text-overflow: ellipsis;
    & span {
        opacity: 0.5;
    }
`;

const Close = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: black;
    background: lightgray;
    height: fit-content;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.8;
`;

const MovieInfoComponent = (props) => {
    const [moiveInfo, setMovieInfo] = useState();
    const { selectedMovie } = props;
    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
        .then((response) => setMovieInfo(response.data));
    },[selectedMovie]);
    return (
        <Container>
            {MovieInfo ? (
                <>
                    <CoverImage src={moiveInfo?.Poster}/>
                    <InfoColumn>
                        <MovieName>{moiveInfo?.Type}: {moiveInfo?.Title}</MovieName>
                        <MovieInfo>التقييم : <span>{moiveInfo?.imdbRating}</span></MovieInfo>
                        <MovieInfo>السنة : <span>{moiveInfo?.Year}</span></MovieInfo>
                        <MovieInfo>لغة الفلم : <span>{moiveInfo?.Language}</span></MovieInfo>
                        <MovieInfo>التصنيف : <span>{moiveInfo?.Rated}</span></MovieInfo>
                        <MovieInfo>تاريخ الاصدار : <span>{moiveInfo?.Released}</span></MovieInfo>
                        <MovieInfo>مدة العرض : <span>{moiveInfo?.Runtime}</span></MovieInfo>
                        <MovieInfo>النوع : <span>{moiveInfo?.Genre}</span></MovieInfo>
                        <MovieInfo>المخرج : <span>{moiveInfo?.Director}</span></MovieInfo>
                        <MovieInfo>الممثلين : <span>{moiveInfo?.Actors}</span></MovieInfo>
                        <MovieInfo>حبكة الرواية : <span>{moiveInfo?.Plot}</span></MovieInfo>
                    </InfoColumn>
                    <Close onClick={() => props.onMovieSelect()}>X</Close>
                </>
            ) : (
                "تحميل البيانات ..."
            )}
        </Container>
    );
};

export default MovieInfoComponent;