"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { MapPin, PhoneCall, User, Users, Calendar, Clock, Mail } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { supabase } from "@/utils/supabase/client";
 
export default function ContactForm() {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emails, setEmails] = useState(''); // Added state for emails
  const [notes, setNote] = useState('');
  const [numberGuest, setGuest] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorGuest, setErrorGuest] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);

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

  // Validate user input
  const validateUserInput = () => {
    let isValid = true;

    if (!name) {
      setErrorName(true);
      isValid = false;
    } else {
      setErrorName(false);
    }

    if (!phoneNumber) {
      setErrorPhone(true);
      isValid = false;
    } else {
      setErrorPhone(false);
    }

    if (!numberGuest) {
      setErrorGuest(true);
      isValid = false;
    } else {
      setErrorGuest(false);
    }

    if (!startDate || !startTime) {
      // You might want to add a specific error state for date/time
      isValid = false;
    }

    return isValid;
  };

// Format date to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null;
  return date.toISOString().split('T')[0]; // e.g., "2025-04-23"
};

// Format time to HH:mm:ss
const formatTime = (time) => {
  if (!time) return null;
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = "00"; // Always set seconds to 00
  return `${hours}:${minutes}:${seconds}`; // e.g., "22:45:00"
};

// Map add-ons to boolean fields
const mapAddOnsToBooleans = (addOns) => {
  return {
    birthday_party: addOns.includes("Birthday Party"),
    anniversary: addOns.includes("Anniversary"),
    first_date: addOns.includes("First Date"),
    promotion_celebration: addOns.includes("Promotion Celebration"),
    reunion: addOns.includes("Reunion"),
    good_view: addOns.includes("Good view"),
  };
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateUserInput()) return;

  // Map add-ons to boolean fields
  const addOnBooleans = mapAddOnsToBooleans(selectedAddOns);

  // Prepare data for Supabase
  const reservationData = {
    name,
    phonenumber: parseInt(phoneNumber, 10), // Convert to number
    emails,
    start_date: formatDate(startDate), // Format as YYYY-MM-DD
    start_time: formatTime(startTime), // Format as HH:mm:ss
    guests: parseInt(numberGuest, 10), // Convert to number
    ...addOnBooleans, // Spread the boolean fields
  };

  console.log("Submitting reservation data:", reservationData);

  // Check if supabase is defined
  if (!supabase) {
    console.error("Supabase client is not initialized. Check your import or environment variables.");
    alert("Failed to submit reservation: Supabase client is not initialized.");
    return;
  }

  // Insert into Supabase
  try {
    const { data, error } = await supabase.from("reservations").insert([reservationData]);
    if (error) {
      console.error("Error submitting reservation:", error);
      // Fallback message if error.message is undefined
      const errorMessage = error.message || "An unknown error occurred while submitting the reservation.";
      alert(`Failed to submit reservation: ${errorMessage}`);
    } else {
      console.log("Reservation submitted successfully:", data);
      alert("Reservation submitted successfully!");
      // Reset the form
      setName('');
      setPhoneNumber('');
      setEmails('');
      setGuest('');
      setStartDate(null);
      setStartTime(null);
      setSelectedAddOns([]);
    }
  } catch (err) {
    console.error("Unexpected error during submission:", err);
    // Log the full error object and stack trace
    console.error("Error details:", JSON.stringify(err, null, 2));
    console.error("Stack trace:", err.stack);
    alert(`An unexpected error occurred: ${err.message || "Unknown error"}`);
  }
};

  return (
    <div className="h-auto bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col columns-2 lg:flex-row gap-8 lg:gap-12">
          <div className="lg:mb-0 lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-700 to-orange-400 bg-clip-text text-transparent">
                RESERVE
                <br />
                YOUR TABLE
              </h1>
              <p className="text-lg sm:text-xl text-gray-300">
                Secure your dining experience in advance.
                <br />
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

          <form onSubmit={handleSubmit} className="flex w-full h-auto md:auto">
            <div className="flex flex-wrap gap-[10px]">
              <div className="flex flex-col w-full">
                <div className="flex">
                  <h4 className="text-white pr-[5px] font-bold">Time Using Meal:</h4>
                  <h4 className="text-red-500 whitespace-nowrap">*</h4>
                </div>
                <div className="flex gap-4">
                  <div className="relative flex items-center w-1/2 max-w-1/2 mt-3">
                    <Calendar size={20} className="absolute left-3 text-white z-10" />
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd MMMM yyyy"
                      minDate={new Date()}
                      className="w-full pl-10 p-2 bg-zinc-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                      placeholderText="Pick Date"
                    />
                  </div>
                  <div className="relative flex items-center w-1/2">
                    <Clock size={20} className="absolute left-3 text-white z-10" />
                    <DatePicker
                      selected={startTime}
                      onChange={(time) => setStartTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Hours"
                      dateFormat="HH:mm"
                      className="w-full pl-10 p-2 bg-zinc-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                      placeholderText="Pick Time"
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-1/2 w-1/2 flex-1 flex-col mt-4">
                <p>Full Name:</p>
                <input
                  placeholder="Your name"
                  value={name}
                  className={`mt-2 w-3/4 bg-zinc-900 rounded-lg p-3 sm:p-4 border ${errorName ? "border-red-500" : "border-zinc-800"} focus:outline-none focus:border-orange-500`}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value) {
                      setErrorName(false);
                    }
                  }}
                />
                {errorName && <p className="text-red-500">Please fill your name to reserve table</p>}
              </div>

              <div className="flex max-w-1/2 w-1/2 flex-col">
                <p>Number of guests:</p>
                <input
                  placeholder="Your number of guests"
                  value={numberGuest}
                  className={`mt-2 w-3/4 bg-zinc-900 rounded-lg p-3 sm:p-4 border ${errorGuest ? "border-red-500" : "border-zinc-800"} focus:outline-none focus:border-orange-500`}
                  onChange={(e) => {
                    setGuest(e.target.value);
                    if (e.target.value) {
                      setErrorGuest(false);
                    }
                  }}
                />
                {errorGuest && <p className="text-red-500">Please fill your guests to reserve table</p>}
              </div>

              <div className="mt-4 flex max-w-1/2 w-1/2 flex-col">
                <p>Phone Number:</p>
                <input
                  placeholder="Your phone number"
                  value={phoneNumber}
                  className={`mt-2 max-w-3/4 bg-zinc-900 rounded-lg p-3 sm:p-4 border ${errorPhone ? "border-red-500" : "border-zinc-800"} focus:outline-none focus:border-orange-500`}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (e.target.value) {
                      setErrorPhone(false);
                    }
                  }}
                />
                {errorPhone && <p className="text-red-500">Please fill your phone number to reserve table</p>}
              </div>

              <div className="mt-4 flex max-w-1/2 w-8/17 flex-col">
                <p>Emails:</p>
                <input
                  placeholder="Your email"
                  value={emails}
                  className={`mt-2 w-3/4 bg-zinc-900 rounded-lg p-3 sm:p-4 border border-zinc-800 focus:outline-none focus:border-orange-500`}
                  onChange={(e) => setEmails(e.target.value)}
                />
              </div>

              <div className="mt-6 flex flex-col">
                <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 flex items-center gap-2">
                  Other description (optional)
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

              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-10">
                  <button
                    type="submit"
                    className="w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-700 text-white font-semibold flex items-center justify-center sm:justify-start gap-2 hover:gap-4 duration-200 hover:opacity-90 transition-all"
                  >
                    Hand us your information
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-sm sm:text-base text-gray-400">Confirmation will be sent in → 5 minutes</span>
                </div>

                <div className="text-right">
                  <p className="text-gray-400 mb-2 sm:mb-4 mt-12 sm:mt-24 text-sm sm:text-base">or RING US</p>
                  <a
                    href="tel:0798896946"
                    className="text-xl sm:text-2xl lg:text-3xl font-bold hover:text-orange-500 transition-colors underline"
                  >
                    +84 999 999 999
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}