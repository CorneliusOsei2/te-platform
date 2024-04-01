import Image from 'next/image'

import { Container } from '@/components/Container'

export function Sponsor() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-amber-500 py-32"
    >
      {/* <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      /> */}
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Current Partners
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            ...
          </p>
          <button href="/register" color="white" className="mt-10">
            Sponsor or Partner
          </button>
        </div>
      </Container>
    </section>
  )
}
