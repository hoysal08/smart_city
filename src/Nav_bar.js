import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-router-bootstrap';
import Button from 'react-router-bootstrap';

function Nav_bar(props) {
  useEffect(() => {
    // Update the document title using the browser API
    props.connectwallet();
  }, []);

  return (
    <div>
      <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="ml-8 container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com/" class="flex items-center">
            <div class="flex space-x-4 mr-2">
              {' '}
              <svg
                class="w-6 h-6 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <LinkContainer to="/">
              <span class="self-center text-xl font-bold whitespace-nowrap dark:text-white">
                Smart_City
              </span>
            </LinkContainer>
          </a>
          <div class="flex md:order-2 flex-col mr-8">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={props.connectwallet}
            >
              {props.connectbutton}
            </button>
            <p class="text-slate-500 hover:text-black">
              {props.defaultaccount}
            </p>
          </div>
          <div class="hidden w-full md:block md:w-auto ml-24" id="navbar-sticky">
            <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <LinkContainer to="/">
                  <a
                    href="#"
                    class="text-xl block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </LinkContainer>
              </li>

              { <li>
                <LinkContainer to="/registration">
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                  >
                    Registration
                  </a>
                </LinkContainer>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav_bar;
