import {
    SuccessContainer,
    ImageFrame,
    ImagesContainer,
    GoBackButton
} from "@/app/styles/pages/success";
import { fetchSessionInfo } from "@/lib/stripe";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
    params: {
        sessionId: string
    }
}

export default async function Success({ params }: SuccessProps) {
    const {sessionId} = params

    const sessionInfo = await fetchSessionInfo(sessionId)

    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex" />
            </Head>
            
            <SuccessContainer>

                <ImagesContainer>
                    {
                        sessionInfo.images.map((imgSrc) => {
                            return (
                                <ImageFrame key={imgSrc}>
                                    <Image src={imgSrc} width={120} height={110} alt="" />
                                </ImageFrame>
                            )
                        })
                    }
                </ImagesContainer>
                
                <h1>Compra efetuada!</h1>

                <p>
                    Uhuul <strong>{sessionInfo.customerName}</strong>, {sessionInfo.quantity <= 1 ? 'sua compra já está' : 'suas compras já estão'} a caminho da sua casa.
                </p>

                <Link href="/">
                    <GoBackButton>Voltar ao catálogo</GoBackButton>
                </Link>
            </SuccessContainer>
        </>
    )
}