import styled from "styled-components";

export const UserInfoModalStyled = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;

    label {
        display: flex;
        flex-direction: column;
    }

    input[type="text"] {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        position: relative;
        width: 400px;
    }

    .button-container {
        text-align: right;
        margin-top: 10px;
    }
    button {
        background-color: #3bb2ea;
        border: none;
        color: white;
        padding: 10px 22px;
        text-align: right;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;
        transition: 0.3s;

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

export const SearchStyled = styled.div`
    float: right;
    margin-bottom: 10px;
    // position: absolute;
    margin-top: -54px !important;
    text-align: right;
    margin-right: 10px;
    input,
    select {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    Button {
        padding-top: 7px;
        padding-bottom: 7px;
    }
`;
