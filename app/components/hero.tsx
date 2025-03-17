import Image from "next/image"

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      {/* Background image with proper positioning */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background_img.jpg"
          alt="Restaurant background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
      </div>

      <div className="container relative z-10 flex flex-col justify-end h-screen mx-auto">
        <div className="w-full p-6 mb-12 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
          <h1 className="mb-4 text-3xl font-bold uppercase  md:text-4xl lg:text-5xl text-black">
            Đặt bàn dễ dàng tại chuỗi nhà hàng HEIRLOOM & VINES
          </h1>
          <p className="text-lg font-medium md:text-xl text-black">
            Đặt bàn trực tuyến tại 200+ nhà hàng toàn quốc. Đảm bảo chất lượng dịch vụ, món ngon và địa điểm ưng ý cho
            mọi thực khách.
          </p>
        </div>
      </div>
    </main>
  )
}

