import React from "react";

const Homepage = () => {
  return (
    <main className="min-h-screen bg-gray-100 text-black p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl">
        <div className="space-y-8">
          <section className="bg-white p-10  shadow-lg rounded-lg flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2 text-center">
              FREE CONTENT{" "}
              <span className="text-gray-600">(LAST 90 DAYS WITH ADS)</span>
            </h1>
            <button
              className="bg-black hover:bg-gray-800  text-white py-2 px-4 rounded-lg mt-4"
              onClick={() => (window.location.href = "/free-content")}
            >
              Access Free Content
            </button>
          </section>

          <section className="bg-white p-10  shadow-lg rounded-lg flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2 text-center">
              ALL MY PREVIOUS CONTENT{" "}
              <span className="text-gray-600">(3 YEARS OF CONTENT)</span>
            </h1>
            <button
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg mt-4 hover:hover:bg-gray-800"
              onClick={() => (window.location.href = "/previous-content")}
            >
              Access Previous Content
            </button>
          </section>
        </div>

        <div className="bg-white p-10 shadow-lg rounded-lg flex flex-col items-center justify-center w-full h-full">
          <section className="text-center">
            <h1 className="text-2xl font-bold mb-2 border-b border-gray-300 pb-2">
              ACCESS VIP ALL CONTENT WITHOUT ADS
            </h1>
            <p className="text-gray-600 mb-4">INSTANT ACCESS</p>
            <p className="text-lg font-semibold">5 USD PER MONTH</p>
            <button
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg mt-4"
              onClick={() => (window.location.href = "/vip-access")}
            >
              Get VIP Access
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
