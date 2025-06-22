"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Company Logo"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white hover:text-indigo-400"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/signin"
              className="text-sm font-semibold leading-6 text-white hover:text-indigo-400"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog
          as="div"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gray-800 p-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Company Logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6">
              <div className="space-y-2 py-6 divide-y divide-gray-700">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
                <Link
                  to="/signin"
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-gray-700"
                >
                  Log in
                </Link>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="relative isolate px-6 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-white">
            AI
            <br />
            <br />
            Hackathon Tracker
            <br />
            <br />
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            AI Hackathon Tracker is your one-stop platform to discover, track, and manage AI hackathons worldwide. Whether you're a participant, organizer, or enthusiast, our tool helps you stay updated on upcoming events, deadlines, and results. Join a vibrant community, streamline your hackathon journey, and never miss an opportunity to innovate with AI!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Get started
            </Link>
            <a
              href="#"
              className="text-sm font-semibold text-white hover:text-indigo-400"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
