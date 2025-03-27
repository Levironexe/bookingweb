// app/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { MapPin, PhoneCall, User, Users, Calendar, Clock, Mail } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';

registerLocale('vi', vi);

export default function Booking() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBookingTime, setSelectedBookingTime] = useState(null);

  const restaurants = [
    { name: 'COCATALIST AEON MALL HCMC', location: 'Ho Chi Minh City' },
    { name: 'COCATALIST VINCOM HANOI', location: 'Hanoi' },
    { name: 'COCATALIST DA NANG CENTER', location: 'Da Nang' },
    { name: 'COCATALIST VAN HANH MALL', location: 'Ho Chi Minh City' },
  ];

  const generateTimeSlots = (startTime) => {
    const slots = [];
    let [hour, minute] = startTime.split(':').map(Number);

    for (let i = 0; i < 4; i++) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      slots.push(time);
      minute += 15;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }
    return slots;
  };

  useEffect(() => {
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const currentHour = now.getHours();

    const startMinutes = Math.ceil(currentMinutes / 15) * 15;
    let startHour = currentHour;
    if (startMinutes >= 60) {
      startHour += 1;
    }
    const minutes = startMinutes % 60;
    const initialStartTime = `${String(startHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    setTimeSlots(generateTimeSlots(initialStartTime));

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setTimeSlots((prevSlots) => {
        if (prevSlots.length === 0) return prevSlots;

        const [firstHour, firstMinute] = prevSlots[0].split(':').map(Number);
        const firstTimeInMinutes = firstHour * 60 + firstMinute;
        const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

        if (currentTimeInMinutes >= firstTimeInMinutes) {
          const [lastHour, lastMinute] = prevSlots[prevSlots.length - 1].split(':').map(Number);
          const nextMinute = lastMinute + 15;
          const nextHour = lastHour + Math.floor(nextMinute / 60);
          const newStartTime = `${String(nextHour).padStart(2, '0')}:${String(nextMinute % 60).padStart(2, '0')}`;
          return generateTimeSlots(newStartTime);
        }
        return prevSlots;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleTimeClick = (time, restaurantName, restaurantLocation) => {
    setSelectedTime(time);
    setSelectedRestaurant(restaurantName);
    setSelectedLocation(restaurantLocation);

    // Parse the selected time (e.g., "08:45") into a Date object for react-datepicker
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const timeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    setSelectedBookingTime(timeDate);

    setIsFormVisible(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const guests = formData.get('guests');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Not selected';
    const formattedTime = selectedBookingTime
      ? selectedBookingTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      : selectedTime;
    alert(
      `Booking confirmed for ${name} at ${selectedRestaurant} (${selectedLocation}) on ${formattedDate} at ${formattedTime} for ${guests} guests! Phone: ${phone}, Email: ${email}`
    );
    setIsFormVisible(false);
    setSelectedTime(null);
    setSelectedRestaurant(null);
    setSelectedLocation(null);
    setSelectedDate(null);
    setSelectedBookingTime(null);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedTime(null);
    setSelectedRestaurant(null);
    setSelectedLocation(null);
    setSelectedDate(null);
    setSelectedBookingTime(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Background Section */}
      <div className="relative w-full h-screen z-0">
        <img
          src="/images/background_img.jpg"
          alt="Background-booking"
          className="object-cover w-full h-full hidden md:block"
          style={{ filter: 'blur(2px)' }}
        />
        <div className="absolute bottom-0 w-full h-100 bg-gradient-to-t from-black opacity-100"></div>
        <div className="absolute inset-0 flex flex-col top-[900px]">
          <p className="text-white text-4xl font-bold text-center">
            <span className="text-yellow-200 px-1">Booking</span> dễ dàng tại chuỗi nhà hàng COCATALIST
          </p>
          <p className="text-white text-center">
            Đặt bàn trực tuyến tại 100+ nhà hàng toàn quốc. Đảm bảo chất lượng dịch vụ, món ngon và địa điểm ưng ý cho mọi thực khách.
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="flex flex-row bg-white p-4 shadow-md rounded-lg w-full h-auto text-center md:w-auto">
        {/* Logo */}
        <div className="w-[250px] h-full border-r-4 border-solid p-10">
          <p className="text-black text-3xl">Logo</p>
        </div>
        <div className="w-full h-full text-center p-10 px-5 md:w-auto">
          <div className="w-full h-10">
            <p className="text-3xl font-bold text-black">Hôm nay ăn gì?</p>
          </div>
          <div className="flex flex-wrap gap-10 pt-[20px]">
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="w-[600px] h-[250px] border-[1.5px] border-black rounded-[10px] flex"
              >
                <div className="w-[300px] h-full border-r-2 border-black flex items-center justify-center">
                  <p className="text-center text-black font-light">logo</p>
                </div>
                <div className="w-full h-full flex flex-wrap justify-center items-center p-[10px]">
                  <div className="flex justify-center items-center w-full h-[50px]">
                    <a href="#" className="text-black font-bold text-[25px]">
                      <span>{restaurant.name}</span>
                    </a>
                  </div>
                  <div className="w-full h-10 flex justify-center items-center gap-2">
                    <MapPin size={40} color="#666" />
                    <p className="text-[20px] font-bold text-black">{restaurant.location}</p>
                  </div>
                  <div className="w-full grid grid-cols-4 gap-2 pt-[10px]">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="w-[70px] h-[35px] bg-yellow-400 rounded-[5px] flex items-center justify-center"
                      >
                        <button
                          value={time}
                          onClick={() => handleTimeClick(time, restaurant.name, restaurant.location)}
                          className="text-[16px] font-bold"
                        >
                          {time}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Centered Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseForm}></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[800px] h-[800px] z-10">
            <div className="pb-[10px] border-b-[3px] border-b-gray-300">
              <h3 className="text-2xl font-bold text-black mb-4">{selectedRestaurant}</h3>
              <div className="flex items-center gap-2 pb-[10px]">
                <MapPin size={24} stroke="currentColor" className="text-gray-600" />
                <p className="text-[16px] font-bold text-gray-600 whitespace-nowrap">
                  {selectedLocation}
                </p>
              </div>
              <div className="flex items-center gap-2 pb-[10px] pt-[3px]">
                <PhoneCall size={24} stroke="currentColor" className="text-gray-600" />
                <p className="text-[16px] font-bold text-gray-600 whitespace-nowrap">
                  84+ 123456789
                </p>
              </div>
            </div>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 pt-[20px]">
              {/* Dining Time */}
              <div>
                <div className="flex">
                  <h4 className="text-black pr-[5px] font-bold">Thời gian dùng bữa</h4>
                  <h4 className="text-red-500 whitespace-nowrap">*</h4>
                </div>
                <div className="flex gap-4">
                  {/* Date Picker */}
                  <div className="relative flex items-center">
                    <Calendar size={20} className="absolute left-3 text-gray-500" />
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd MMMM yyyy"
                      locale="vi"
                      minDate={new Date()}
                      className="w-[300px] pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 custom-placeholder text-black"
                      placeholderText="Chọn ngày"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Time Picker */}
                  <div className="relative flex items-center">
                    <Clock size={20} className="absolute left-3 text-gray-500" />
                    <DatePicker
                      selected={selectedBookingTime}
                      onChange={(time) => setSelectedBookingTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Giờ"
                      dateFormat="HH:mm"
                      className="w-[150px] pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 custom-placeholder text-black"
                      placeholderText="Chọn giờ"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Number of People and Full Name */}
              <div className="flex gap-4">
                {/* Number of People */}
                <div className="flex-1">
                  <div className="flex">
                    <label htmlFor="guests" className="text-black font-bold">
                      Số lượng người
                    </label>
                    <span className="text-red-500 pl-1">*</span>
                  </div>
                  <div className="relative flex items-center">
                    <Users size={20} className="absolute left-3 text-gray-500" />
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      min="1"
                      required
                      className="w-full pl-10 p-2 border border-gray-300 rounded text-black"
                      placeholder="Số người"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="flex-1">
                  <div className="flex">
                    <label htmlFor="name" className="text-black font-bold">
                      Họ tên
                    </label>
                    <span className="text-red-500 pl-1">*</span>
                  </div>
                  <div className="relative flex items-center">
                    <User size={20} className="absolute left-3 text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full pl-10 p-2 border border-gray-300 rounded text-black"
                      placeholder="Nhập họ tên"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Number and Email */}
              <div className="flex gap-4">
                {/* Phone Number */}
                <div className="flex-1">
                  <div className="flex">
                    <label htmlFor="phone" className="text-black font-bold">
                      Số điện thoại
                    </label>
                    <span className="text-red-500 pl-1">*</span>
                  </div>
                  <div className="relative flex items-center">
                    <PhoneCall size={20} className="absolute left-3 text-gray-500" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full pl-10 p-2 border border-gray-300 rounded text-black"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex-1">
                  <div className="flex">
                    <label htmlFor="email" className="text-black font-bold">
                      Email
                    </label>
                    <span className="text-red-500 pl-1">*</span>
                  </div>
                  <div className="relative flex items-center">
                    <Mail size={20} className="absolute left-3 text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full pl-10 p-2 border border-gray-300 rounded text-black"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className='flex pt-[20px]'>
                    <label for = 'text' className='text-black font-bold'>Ghi Chu</label>
                    <p className='text-red-500 whitespace-nowrap pl-1'>*</p>
                  </div>
                  <div>
                    <textarea id="message" name = "note" placeholder='Nhap Ghi Chu' className='p-[5px] text-black border border-gray-500 rounded-[10px] w-full h-[200px] text-[20px]'></textarea>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}