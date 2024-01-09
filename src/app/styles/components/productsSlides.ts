import { styled } from "..";

export const HomeContainer = styled('main', {
    display: 'flex',
    width: '100%',
    minHeight: 656,
})

export const ProductCard = styled('div', {
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: 8,
    position: 'relative',

    a: {
        cursor: 'pointer',
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '1.65rem',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        h3: {
            FontSize: '$lg',
            color: '$gray100',
            margin: '0 0 0.5rem 0',
        },

        h2: {
            fontSize: '$xl',
            color: '$green700',
            margin: '0',
        },
    },

    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
        }
    }
})

export const Product = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    img: {
        marginTop: '5rem',
        objectFit: 'cover',
    },
})

export const AddToCartButton = styled('button', {
    border: '0',
    backgroundColor: '$green500',
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: 8,
    alignItems: 'center',
    lineHeight: 0,
    cursor: 'pointer',
    
    svg: {
        width: '2rem',
        height: '2rem',
        color: '$white',
    },
})