import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <h1 className="text-primary">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
      <h2 className="text-secondary">One Life Graphic T-/shirt</h2>
      <h3 className="text-tertiary">NEW ARRIVALS</h3>

      <article>
        <Image
          unoptimized
          src="https://picsum.photos/400/400?random=1"
          alt="One Life Graphic T-shirt"
          width={400}
          height={400}
        />
        <p className="text-primary">One Life Graphic T-shirt</p>
        <p className="text-secondary">$19.99</p>
        <p className="text-tertiary">S</p>
        <p>
          <button className="bg-brand-chip-selected text-brand-chip-text-selected">
            ADD TO CART
          </button>
        </p>

        <h3 className="text-brand-label-text">
          <span className="bg-brand-label text-brand-label-text">SALE</span> 50%
          OFF
        </h3>
      </article>
    </main>
  );
}
