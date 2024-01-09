import { globalCss } from '.'

export const globalStyles = globalCss({
    '*' : {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },

    ':focus': {
        outline: 0,
        boxShadow: '0 0 0 1px $green500',
    },

    body: {
        backgroundColor: '$gray900',
    },

    'body, input, textarea, button': {
        fontFamily: 'Roboto, sans-serif',
        color: '$gray100',
        fontWeight: 400,
        '-webkit-font-smoothing': 'antialiased',
    },
})