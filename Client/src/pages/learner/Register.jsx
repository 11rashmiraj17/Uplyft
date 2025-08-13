import React from 'react';

const Register = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: '1000px' }}
      >
        <div className="md:flex w-full">
          {/* Left SVG Panel */}
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>

          {/* Right Form Panel */}
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>

            <form>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="firstName" className="text-xs font-semibold px-1">
                    First name
                  </label>
                  <div className="flex">
                    <input
                      id="firstName"
                      type="text"
                      className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="lastName" className="text-xs font-semibold px-1">
                    Last name
                  </label>
                  <div className="flex">
                    <input
                      id="lastName"
                      type="text"
                      className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Smith"
                    />
                  </div>
                </div>
              </div>

              <div className="px-3 mb-5">
                <label htmlFor="email" className="text-xs font-semibold px-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="johnsmith@example.com"
                />
              </div>

              <div className="px-3 mb-12">
                <label htmlFor="password" className="text-xs font-semibold px-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="************"
                />
              </div>

              <div className="px-3">
                <button
                  type="submit"
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  REGISTER NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      
      
    </div>
  );
};

export default Register;
