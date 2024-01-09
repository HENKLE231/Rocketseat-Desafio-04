import { styled } from '..'

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
})

export const Toggler = styled('button', {
    border: '0',
    backgroundColor: 'transparent',

    label: {
        display: 'block',
        padding: '0.75rem',
        borderRadius: 6,
        backgroundColor: '$gray800',
        lineHeight: 0,
        overflow: 'hidden',
        cursor: 'pointer',
    },
    
    svg: {
        width: '1.5rem',
        height: '1.5rem',
        color: '$gray500',
    },

    '&:has(div) > label > svg': {
        color: '$gray300',
        transition: 'background-color 0.2s'
    },
})

export const ShoppingCartProductsAmount = styled('div', {
    height: 'fit-content',
    width: 'fit-content',
    position: 'absolute',
    padding: '0.1rem 0.53rem',
    marginLeft: '0.85rem',
    marginTop: '-2.85rem',
    lineHeight: 1.5,
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '1000px',
    color: '$white',
    backgroundColor: '$green500',
    overflow: 'hidden',
    border: '3px solid $gray900',
})

// Side Shopping Cart
export const ShoppingCartContainer = styled('div', {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    position: 'fixed',
    width: '100%',
    maxWidth: 480,
    height: '100svh',
    zIndex: 1,
    top: 0,
    right: -480,
    backgroundColor: '$gray800',
    transition: '0.2s',
    padding: '1.5rem',
    boxShadow: '0 0 64px 64px rgba(0, 0, 0, 0.5)',

    'input[type="checkbox"]': {
        display: 'none',
    },

    '&:has(input[type="checkbox"]:checked)': {
        right: 0,
    }
})

export const CloseButtonContainer = styled('div', {
    textAlign: 'right',
    width: '100%',

    button: {
        border: '0',
        backgroundColor: 'transparent',
    },

    label: {
        cursor: 'pointer',
    },

    svg: {
        color: '$gray500',
    },
})

export const InfoContainer = styled('div', {
    display: 'grid',
    gridTemplateRows: '1fr min-content',
    padding: '1.5rem',
    
    'h3:first-child': {
        fontSize: '$lg',
        marginBottom: '3rem',
    }
})

export const ProductDisplay = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '1rem',
})

export const ImgFrame = styled('div', {
    width: 100,
    height: 100,
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    img: {
        objectFit: 'cover',
    },
})

export const ProductList = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gap: '1.5rem',
})

export const ProductInfo = styled('div', {
    p: {
        color: '$gray300',
    },

    h3: {
        color: '$gray100',
        fontSize: '$md',
        margin: '0.75rem 0 0.9rem'
    },

    button: {
        backgroundColor: 'transparent',
        color: '$green500',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: 0,
        cursor: 'pointer',
    },
})

export const TotalInfoDisplay = styled('div', {
    div: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    'div:first-child': {
        marginBottom: '1rem',

        'span:last-child': {
            fontSize: '$md',
        },
    },

    'div:last-child': {
        'span:first-child': {
            fontSize: '$md',
            fontWeight: 'bold',
        },

        'span:last-child': {
            fontSize: '$xl',
            fontWeight: 'bold',
        },
    },
})

export const CheckoutButton = styled('button', {
    width: '100%',
    backgroundColor: '$green500',
    fontWeight: 'bold',
    fontSize: '$md',
    padding: '1.25rem',
    border: 0,
    borderRadius: 8,
    marginTop: '3rem',

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
        backgroundColor: '$green700',
        transition: 'background-color 0.2s',
    }
})