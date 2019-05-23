import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    :root {
        --color-bodybg: #3C3F64;
        --color-blue: #585DFE;
        --color-darkgrey: #53555D;
        --color-lightgrey: #E6E6E7;
        --color-humanbody: #FFCD82;
        --color-shirtLeft: #71CC54;
        --color-shirtRight: #12A56B;
        --color-appbg: #F5F5F5;
        --color-white: #FFFFFF;
        --color-yellow: #FFB800;
        --color-eye: #010000;
        --color-ear: #FFCD72;
        --color-hair: #000;
        --color-nose: #12A56B;
        --font-size-default: 14px;
        --font-size-large: 36px;
    }

    html{
        height: 100%;
        width: 100%;
    }
    
    body {
        font-weight: bold;
        font-size: var(--font-size-default);
        background-color: var(--color-bodybg);
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
        width: 100%;
    }

    #root {
       display: flex;
       justify-content: center;
       align-items: center;
       height: 100%;
       width: 100%;
    }
`
