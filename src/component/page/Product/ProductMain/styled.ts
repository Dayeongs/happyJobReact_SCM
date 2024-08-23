import styled from "styled-components";

export const ProductMainStyled = styled.div`
    button {
        background-color: #3bb2ea;
        border: none;
        color: white;
        height: 34px;
        width: 70px;
        margin: 4px 2px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;
        font-size: 16px;

        &:hover {
            background-color: #45a049;
        }

        &:active {
            background-color: #3e8e41;
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }
    }
`;
