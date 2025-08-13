"use client";

export default function KeychainContent() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Keychains</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900">Metal Keychain</h3>
            <p className="text-sm text-gray-600 mt-1">
              Durable stainless steel
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2">$12.99</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900">Wooden Keychain</h3>
            <p className="text-sm text-gray-600 mt-1">Engraved hardwood</p>
            <p className="text-lg font-bold text-gray-900 mt-2">$15.99</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="rounded-full flex items-center justify-center bg-white hover:bg-[#DFDDDE] text-[#545253] font-semibold text-sm h-10 px-10"
          href={"/customize"}
        >
          Create
        </a>
      </div>
    </div>
  );
}
