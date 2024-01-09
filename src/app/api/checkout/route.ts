import { stripe } from '../../../lib/stripe'
import { NextResponse } from 'next/server'

interface PostProps {
    priceIds: string[]
}

export async function POST(req: Request, res: Response) {
    const { priceIds }: PostProps = await req.json()
    priceIds
    
    const successUrl = `${process.env.NEXT_URL}/success/{CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`

    if (!priceIds || priceIds.length == 0) {
        return NextResponse.json(
            {
                message: 'Error: Prices not found.',
            },
            {status: 400}
        )
    }

    const lineItems = priceIds.map((priceId) => {
        return {
            price: priceId,
            quantity: 1
        }
    })

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: lineItems,
    })


    return NextResponse.json(
        {
            message: 'Success',
            checkoutUrl: checkoutSession.url
        },
        {status: 201}
    )

}