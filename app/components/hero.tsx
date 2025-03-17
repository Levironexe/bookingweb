import Image from "next/image";

export default function Home() {
  return (
    <div className="relative  w-full h-screen">
        <Image 
            src="/images/background_img.jpg"
            alt="Restaurant" 
            className="absolute z-0"
            fill={true}
        />   
        <div>
        <p className="absolute z-10 text-black bottom-0" >ĐẶT BÀN dễ dàng tại chuỗi nhà hàng COCATALIST</p>
        </div>
    </div>
  );
}