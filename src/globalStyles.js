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
        --font-size-default: 14px;
        --font-size-large: 36px;
    }
    body {
        font-weight: bold;
        font-size: var(--font-size-default);
        background-color: var(--color-bodybg);
        padding: 50px;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #root {
        position: relative;
        overflow: hidden;
        height: 500px;
        width: 900px;
        background-color: var(--color-appbg);
        margin: 0 auto;
        border-radius: 5px;
    }
`
