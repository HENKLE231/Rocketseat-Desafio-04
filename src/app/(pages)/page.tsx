import { fetchProducts } from "@/lib/stripe";
import { ProductsSlides } from "./components/ProductsSlides";

export default async function Home() {
    const products = await fetchProducts()

    return <ProductsSlides products={products} />
}