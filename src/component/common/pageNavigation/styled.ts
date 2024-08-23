import styled from "styled-components";

export const PageNavigateStyled = styled.div`
    text-align: center;
    margin: 20px auto;
    padding: 0 15px;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: inline-flex;
    }

    li {
        margin: 0;
        display: inline;
    }

    a {
        display: inline-block;
        padding: 10px 15px;
        color: black;
        text-decoration: none;
        border: 1px solid #dee2e6;
        border-radius: 0;
        background-color: #fff;
        transition: background-color 0.2s, color 0.2s, border-color 0.2s;
        box-sizing: border-box;
        margin: -1px 0 0 -1px;
    }

    a:first-child {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }

    a:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

    a:hover,
    a:focus {
        background-color: #e9ecef;
        color: black;
        border-color: #adb5bd;
    }

    .active a {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }

    .disabled a {
        color: #6c757d;
        pointer-events: none;
        background-color: #e9ecef;
        border-color: #dee2e6;
    }
`;
