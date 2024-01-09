import { styled } from "..";

export const SuccessContainer = styled('main',  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
        paddingTop: '3rem',
        paddingBottom: '2rem'
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        lineHeight: 1.4,
    },

    a: {
        display: 'block',
        marginTop: '5rem',
        fontSize: '$lg',
        color: '$green500',
        textDecoration: 'none',
        fontWeight: 'bold',

        '&:hover': {
            color: '$green300',
        }
    },
})

export const ImagesContainer = styled('div', {
    display: 'flex',

    div: {
        marginLeft: -46
    },

    'div:first-child': {
        marginLeft: 0
    },
})

export const ImageFrame = styled('div',  {
    width: 140,
    height: 140,
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: 10000,
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4rem',
    boxShadow: '0 0 15px 1px rgba(0,0,0,0.7)',
    
    img: {
        objectFit: 'cover'
    },
})

export const GoBackButton = styled('button', {
    border: 0,
    backgroundColor: 'transparent',
    fontSize: '$lg',
    color: '$green500',
    cursor: 'pointer',

    '&:hover': {
        color: '$green700',
    },
})