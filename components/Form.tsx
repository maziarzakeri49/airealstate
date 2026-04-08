"use client";

import { useState } from "react";

export default function Form({ onSubmit }: any) {
  const [form, setForm] = useState({
    type: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    square: "",
    locker: "",
    parking: "",
    features: "",
    buildingAge: "",
    buildingName: "",
    maintenanceFees: "",
    buildingType: "",
    layout: "",
    flooring: "",
    kitchenFeatures: "",
    kitchenLayout: "",
    balcony: ""
  });

  const inputStyle =
    "w-full rounded-xl border border-gray-200 bg-gray-100 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-gray-900 placeholder:text-gray-700";

  
  const sectionStyle =
    "bg-white rounded-2xl shadow-sm border border-gray-300 p-4 sm:p-6 space-y-4";

  const checkboxStyle =
    "flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 cursor-pointer hover:border-indigo-300 transition";

  return (
    <div className="space-y-8">

      {/* 1. Core Property */}
      <div className={sectionStyle}>
        <h2 className="text-lg sm:text-xl font-semibold text-indigo-600">
          1. Core Property Basics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputStyle}>
            <option value="">Property Type</option>
            {["Condo Apt", "Loft", "Townhouse Condo", "House"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <input className={inputStyle} placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />

          <input className={inputStyle} placeholder="Price (e.g. $750,000)" onChange={(e) => setForm({ ...form, price: e.target.value })} />

          <select value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} className={inputStyle}>
            <option value="">Bedrooms</option>
            {[1,2,3,4,5,6,7,8].map((n) => <option key={n}>{n}</option>)}
          </select>

          <select value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} className={inputStyle}>
            <option value="">Bathrooms</option>
            {[1,2,3,4,5].map((n) => <option key={n}>{n}</option>)}
          </select>

          <input className={inputStyle} placeholder="Square Footage" onChange={(e) => setForm({ ...form, square: e.target.value })} />

          {/* Locker */}
          <label className={checkboxStyle}>
            <span className="text-sm text-gray-700">Locker</span>
            <input type="checkbox" className="accent-indigo-600"
              onChange={(e) => setForm({ ...form, locker: e.target.checked ? "yes" : "" })}
            />
          </label>

          {/* Parking */}
          <label className={checkboxStyle}>
            <span className="text-sm text-gray-700">Parking</span>
            <input type="checkbox" className="accent-indigo-600"
              onChange={(e) => setForm({ ...form, parking: e.target.checked ? "yes" : "" })}
            />
          </label>

        </div>

        <textarea
          className={inputStyle + " min-h-30 resize-none"}
          placeholder="Key Features..."
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />
      </div>

      {/* 2. Building Info */}
      <div className={sectionStyle}>
        <h2 className="text-lg sm:text-xl font-semibold text-purple-600">
          2. Building Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <select value={form.buildingAge} onChange={(e) => setForm({ ...form, buildingAge: e.target.value })} className={inputStyle}>
            <option value="">Building Age</option>
            {["New", "5 years", "10 years", "Older"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select value={form.buildingType} onChange={(e) => setForm({ ...form, buildingType: e.target.value })} className={inputStyle}>
            <option value="">Building Type</option>
            {["Boutique", "High-rise", "Luxury"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <input className={inputStyle} placeholder="Building Name" onChange={(e) => setForm({ ...form, buildingName: e.target.value })} />

          <input className={inputStyle} placeholder="Maintenance Fees" onChange={(e) => setForm({ ...form, maintenanceFees: e.target.value })} />

        </div>

        <textarea
          className={inputStyle + " min-h-30 resize-none"}
          placeholder="Building Amenities..."
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />
      </div>

      {/* 3. Interior */}
      <div className={sectionStyle}>
        <h2 className="text-lg sm:text-xl font-semibold text-pink-600">
          3. Interior Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <select value={form.layout} onChange={(e) => setForm({ ...form, layout: e.target.value })} className={inputStyle}>
            <option value="">Layout</option>
            {["Open concept", "Split bedroom", "Functional"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select value={form.flooring} onChange={(e) => setForm({ ...form, flooring: e.target.value })} className={inputStyle}>
            <option value="">Flooring</option>
            {["Hardwood", "Laminate", "Ceramic", "Carpet"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select value={form.kitchenFeatures} onChange={(e) => setForm({ ...form, kitchenFeatures: e.target.value })} className={inputStyle}>
            <option value="">Kitchen Features</option>
            {["Quartz", "Granite", "Wood"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select value={form.kitchenLayout} onChange={(e) => setForm({ ...form, kitchenLayout: e.target.value })} className={inputStyle}>
            <option value="">Kitchen Layout</option>
            {["Island", "Breakfast bar", "Classic"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* Balcony */}
          <label className={checkboxStyle}>
            <span className="text-sm text-gray-700">Balcony</span>
            <input type="checkbox" className="accent-indigo-600"
              onChange={(e) => setForm({ ...form, balcony: e.target.checked ? "yes" : "" })}
            />
          </label>

        </div>

        <textarea
          className={inputStyle + " min-h-30 resize-none"}
          placeholder="Interior Features..."
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />
      </div>

      {/* CTA */}
      <button
        onClick={() => onSubmit(form)}
        className="
        cursor-pointer
          w-full 
          bg-linear-to-r  from-indigo-600 to-purple-600 
          
          text-white 
          py-3 rounded-xl 
          text-base font-medium 
          shadow-lg
          hover:opacity-90 
          active:scale-95 
          transition
        "
      >
        Generate Content ✨
      </button>

    </div>
  );
}