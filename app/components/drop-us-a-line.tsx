'use client';

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { MapPin, PhoneCall, User, Users, Calendar, Clock, Mail } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { supabase } from "@/utils/supabase/client";

export default function ContactForm() {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emails, setEmails] = useState('');
  const [notes, setNote] = useState('');
  const [numberGuest, setGuest] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorGuest, setErrorGuest] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      // Fetch locations
      const { data: locationData, error: locationError } = await supabase
        .from('locations')
        .select('*');

      if (locationError) {
        console.error('Error fetching locations:', locationError);
      } else if (locationData && locationData.length > 0) {
        setLocations(locationData);
        setSelectedLocation(locationData[0]); 
      }
    };

    fetchData();
  }, []);

  const handleClick_location = async () => {
    console.log("Clicked location button");
    const { data, error } = await supabase
      .from('locations')
      .select('*');

    if (error) {
      console.error('Error fetching locations:', error);
      alert('Failed to load locations');
      return;
    }
    setLocations(data);
    setIsModalOpen(true);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location); 
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addOns = [
    "Birthday Party",
    "Anniversary",
    "First Date",
    "Promotion Celebration",
    "Reunion",
    "Good view",
  ];

  const toggleAddOn = (addon: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addon) ? prev.filter((item) => item !== addon) : [...prev, addon]
    );
  };

  const validateUserInput = () => {
    let isValid = true;
    if (!name) { setErrorName(true); isValid = false; } else { setErrorName(false); }
    if (!phoneNumber) { setErrorPhone(true); isValid = false; } else { setErrorPhone(false); }
    if (!numberGuest) { setErrorGuest(true); isValid = false; } else { setErrorGuest(false); }
    if (!startDate || !startTime) { isValid = false; }
    return isValid;
  };

  const formatDate = (date) => (date ? date.toISOString().split('T')[0] : null);
  const formatTime = (time) => {
    if (!time) return null;
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}:00`;
  };

  const mapAddOnsToBooleans = (addOns) => ({
    birthday_party: addOns.includes("Birthday Party"),
    anniversary: addOns.includes("Anniversary"),
    first_date: addOns.includes("First Date"),
    promotion_celebration: addOns.includes("Promotion Celebration"),
    reunion: addOns.includes("Reunion"),
    good_view: addOns.includes("Good view"),
  });

  const handleForm = async (e) => {
    e.preventDefault();
    if (!validateUserInput()) return;

    const addOnBooleans = mapAddOnsToBooleans(selectedAddOns);
    const reservationData = {
      name,
      phonenumber: parseInt(phoneNumber, 10),
      emails,
      start_date: formatDate(startDate),
      start_time: formatTime(startTime),
      guests: parseInt(numberGuest, 10),
      location_name: selectedLocation?.name, 
      location_address: selectedLocation?.location, 
      notes,
      ...addOnBooleans,
    };

    try {
      const { data, error } = await supabase.from("reservations").insert([reservationData]).select();
      if (error) throw error;
      alert("Reservation submitted successfully!");
      setName(''); setPhoneNumber(''); setEmails(''); setGuest('');
      setStartDate(null); setStartTime(null); setSelectedAddOns([]);
    } catch (err) {
      console.error("Error submitting reservation:", err);
      alert(`Failed to submit reservation: ${err.message || "Unknown error"}`);
    }
  };

  return (
    <div className="h-auto bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-700 to-orange-400 bg-clip-text text-transparent">
                RESERVE<br />YOUR TABLE
              </h1>
              <p className="text-lg sm:text-xl text-gray-300">
                Secure your dining experience in advance.<br />
                Our popular tables fill quickly as we strive to provide each guest with attentive service and an unforgettable culinary journey.
              </p>
            </div>
            <div className="relative h-100 w-full">
              <Image src="/images/spaghetti.png" alt="spaghetti image" fill className="object-cover rounded-lg" />
            </div>
          </div>

          <form onSubmit={handleForm} className="flex w-full h-auto md:auto">
            <div className="flex flex-wrap gap-[10px]">
              <div className="flex flex-col w-full h-auto border-[1px] rounded-[10px] p-3">
                <button onClick={handleClick_location} className="text-white text-left" type="button">
                  {selectedLocation ? (
                    <div>
                      <h4 className="text-lg font-semibold">{selectedLocation.name}</h4>
                      <p className="text-gray-300 mt-1">
                        <span className="font-medium">Address:</span> {selectedLocation.location}
                      </p>
                      <p className="text-gray-300 mt-1">
                        <span className="font-medium">Seating Capacity:</span> {selectedLocation.seating_capacity}
                      </p>
                      <p className="text-gray-300 mt-1">
                        <span className="font-medium">Operating Hours:</span> {selectedLocation.operating_hours}
                      </p>
                      <p className="text-gray-300 mt-1">
                        <span className="font-medium">Description:</span> {selectedLocation.description}
                      </p>
                      <p className="text-gray-300 mt-1">
                        <span className="font-medium">GPS:</span> {selectedLocation.gps}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-300">Select a location...</p>
                  )}
                </button>
              </div>

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
                      className="w-full pl-10 p-2 bg-zinc-900 border-[1px] border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white h-[50px]"
                      placeholderText="Pick Date"
                    />
                  </div>
                  <div className="relative flex items-center w-1/2 mt-3">
                    <Clock size={20} className="absolute left-3 text-white z-10" />
                    <DatePicker
                      selected={startTime}
                      onChange={(time) => setStartTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Hours"
                      dateFormat="HH:mm"
                      className="w-full pl-10 p-2 bg-zinc-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white h-[50px]"
                      placeholderText="Pick Time"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full h-auto">
                <div className="max-w-1/2 w-1/2 flex flex-col mt-4">
                  <p>Full Name:</p>
                  <input
                    placeholder="Your name"
                    value={name}
                    className={`mt-2 w-3/4 bg-zinc-900 rounded-lg p-3 sm:p-4 border ${errorName ? "border-red-500" : "border-zinc-800"} focus:outline-none focus:border-orange-500`}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value) setErrorName(false);
                    }}
                  />
                  {errorName && <p className="text-red-500">Please fill your name to reserve table</p>}
                </div>
                <div className="flex max-w-1/2 w-1/2 flex-col mt-4">
                  <p>Number of guests:</p>
                  <input
                    placeholder="Your number of guests"
                    value={numberGuest}
                    className={`mt-2 w-3/4 bg-zinc-900 rounded-lg p-3 sm:p-4 border ${errorGuest ? "border-red-500" : "border-zinc-800"} focus:outline-none focus:border-orange-500`}
                    onChange={(e) => {
                      setGuest(e.target.value);
                      if (e.target.value) setErrorGuest(false);
                    }}
                  />
                  {errorGuest && <p className="text-red-500">Please fill your guests to reserve table</p>}
                </div>
              </div>
              <div className="flex w-full h-auto">
                <div className="mt-4 flex max-w-1/2 w-1/2 flex-col">
                  <p>Phone Number:</p>
                  <input
                    placeholder="Your phone number"
                    value={phoneNumber}
                    className={`mt-2 max-w-3/4 bg-zinc-900 rounded-lg p-3 sm:p-4 border ${errorPhone ? "border-red-500" : "border-zinc-800"} focus:outline-none focus:border-orange-500`}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (e.target.value) setErrorPhone(false);
                    }}
                  />
                  {errorPhone && <p className="text-red-500">Please fill your phone number to reserve table</p>}
                </div>
                <div className="mt-4 flex max-w-1/2 w-3/4 flex-col">
                  <p>Emails:</p>
                  <input
                    placeholder="Your email"
                    value={emails}
                    className={`mt-2 w-8/10 bg-zinc-900 rounded-lg p-3 sm:p-4 border border-zinc-800 focus:outline-none focus:border-orange-500`}
                    onChange={(e) => setEmails(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col w-full">
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
                    onClick={handleForm}
                    className="w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-700 text-white font-semibold flex items-center justify-center sm:justify-start gap-2 hover:gap-4 duration-200 hover:opacity-90 transition-all"
                  >
                    Hand us your information
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-sm sm:text-base text-gray-400">Confirmation will be sent in → 5 minutes</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-white">Select a Location</h2>
            {locations.length > 0 ? (
              <div className="flex flex-col gap-4">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handleSelectLocation(location)}
                    className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-orange-500 cursor-pointer transition-colors"
                  >
                    <h4 className="text-lg font-semibold">{location.name}</h4>
                    <p className="text-gray-300 mt-1">
                      <span className="font-medium">Address:</span> {location.location}
                    </p>
                    <p className="text-gray-300 mt-1">
                      <span className="font-medium">Seating Capacity:</span> {location.seating_capacity}
                    </p>
                    <p className="text-gray-300 mt-1">
                      <span className="font-medium">Operating Hours:</span> {location.operating_hours}
                    </p>
                    <p className="text-gray-300 mt-1">
                      <span className="font-medium">Description:</span> {location.description}
                    </p>
                    <p className="text-gray-300 mt-1">
                      <span className="font-medium">GPS:</span> {location.gps}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No locations found.</p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}