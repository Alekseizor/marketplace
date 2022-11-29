import React from "react";


export function SearchComponent() {
    return (
        <div className="flex items-center">
            <div className="flex space-x-1">
                <form>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 text-gray-500 bg-white border rounded-full focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                        onChange={(event) => console.log(event.target.value)}
                    />
                </form>
                <button className="px-4 text-white bg-gray-600 rounded-full hover:py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}