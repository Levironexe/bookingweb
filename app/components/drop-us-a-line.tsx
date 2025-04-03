"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"


export default function ContactForm() {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [note, setNote] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);


  const addOns = [
    "Birthday Party",
    "Anniversary",
    "First Date",
    "Promotion Celebration",
    "Reunion",
    "Good view",
  ]

  const toggleAddOn = (addon: string) => {
    setSelectedAddOns((prev) => (prev.includes(addon) ? prev.filter((item) => item !== addon) : [...prev, addon]))
  }

  const validateUserInput = () => {
    if (!name) {
      setErrorName(true)
      console.log('Please enter your name')
    }
    if (!phoneNumber) {
      setErrorPhone(true)
      console.log('Please enter your phone number')

    }
    else {

    }
  }

  return (
    <div className="h-auto bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className=" lg:mb-0 lg:w-1/2 flex flex-col justify-between">
            <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-700 to-orange-400 bg-clip-text text-transparent">
              RESERVE
              <br />
              YOUR TABLE
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">
            Secure your dining experience in advance. 
            <br/>
            Our popular tables fill quickly as we strive to provide each guest with attentive service and an unforgettable culinary journey.
            </p>
            </div>
            
            <div className="relative h-100 w-full">
              <Image
                src="/images/spaghetti.png"
                alt="spaghetti image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

        <div  className="h-auto flex flex-col justify-between lg:w-1/2">
          <form>
            <input
              placeholder="Your name"
              className={`w-full bg-zinc-900 rounded-lg p-3 sm:p-4 border ${errorName ? "border-red-500": "border-zinc-800"} focus:outline-none focus:border-orange-500`}
              onChange={(e) => {setName(e.target.value)
                if (name != '') {
                  setErrorName(false)
                }
              }
              
              }
            />
            {errorName && <p className="text-red-500">Please fill your name to reserve table</p>}

            <input
              placeholder="Your phone number"
              className={`mt-6 w-full bg-zinc-900 rounded-lg p-3 sm:p-4 border ${errorPhone ? "border-red-500": "border-zinc-800"} focus:outline-none focus:border-orange-500`}
              onChange={(e) => {setPhoneNumber(e.target.value)
                if (phoneNumber != '') {
                  setErrorPhone(false)
                }
              }}
            />
            {errorPhone && <p className="text-red-500">Please fill your phone number to reserve table</p>}


            <div className="mt-6">
              <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 flex items-center gap-2">
                Other despcription (optional)
                <span className="bg-zinc-900 rounded-full w-5 h-5 sm:w-6 sm:h-6 inline-flex items-center justify-center text-xs sm:text-sm">
                  ?
                </span>
              </h3>
              <textarea
              placeholder="Tell us what to enhance your experience"
              className="h-[150px] mb-6 w-full bg-zinc-900 rounded-lg p-3 sm:p-4 border border-zinc-800 focus:outline-none focus:border-orange-500"
              onChange={(e) => setNote(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {addOns.map((addon) => (
                  <button
                    key={addon}
                    type="button"
                    onClick={() => toggleAddOn(addon)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-sm sm:text-base transition-colors ${
                      selectedAddOns.includes(addon)
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-zinc-800 hover:border-orange-500"
                    }`}
                  >
                    {addon}
                  </button>
                ))}
              </div>
            </div>
          </form>
          <div className="flex flex-col ">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-10">
                <button
                  onClick={validateUserInput}
                  className="w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-700 text-white font-semibold flex items-center justify-center sm:justify-start gap-2 hover:gap-4 duration-200 hover:opacity-90 transition-all"
                >
                  Hand us your information
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="text-sm sm:text-base text-gray-400">Confirmation will be sent in → 5 minutes</span>
              </div>
              
              <div className="text-right">
              <p className="text-gray-400 mb-2 sm:mb-4 mt-12 sm:mt-24 text-sm sm:text-base">or RING US </p>
              <a
                href="tel:0798896946"
                className="text-xl sm:text-2xl lg:text-3xl font-bold hover:text-orange-500 transition-colors underline"
              >
                +84 999 999 999
              </a>
            </div>
            </div>
            
        </div>
        </div>
      </div>
    </div>
  )
}

