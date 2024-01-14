import "bootstrap/dist/css/bootstrap.min.css";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    ::selection {
        color: white;
        background: black;
    }

    ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb {
        height: 56px;
        border-radius: 8px;
        border: 4px solid transparent;
        background-clip: content-box;
        background-color: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }
`;
