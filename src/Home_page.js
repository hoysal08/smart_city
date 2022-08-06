import React,{useState} from 'react';
import { ethers } from "ethers";
import ABI from "./contracts/pollution.json"

console.log(ABI);
async function Home_page() {
const cntadd= "0x4b5cabe7b657bbc3eb90d7a0e3886db81c503c1e"
  const [vehicalnum,setvehicleNumber]=useState()
  function handleclick(e){
    e.preventDefault();   
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    const signer=provider.getSigner();
     const cnt = new ethers.Contract(cntadd,ABI,signer);
     let txn= await cnt.getTokenId(vehicalnum);
     console.log(txn);

  }
  return (
    <div class="w-screen h-screen py-20 bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 ">
      <div class="bg-white max-w-lg mx-auto p-8 md:p-12 my-14 rounded-lg shadow-2xl">
        <section>
          <h3 class="font-bold text-2xl">Welcome to Smart City</h3>
          <p class="text-gray-600 pt-2">Enter the vehicle information below.</p>
        </section>

        <section class="mt-10">
          <form class="flex flex-col">
            <div class="mb-6 pt-3 rounded bg-gray-200">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                for="email"
              >
                Enter vehicle Number
              </label>
              <input
                type="text"
                id="vehicle_number"
                placeholder="XX-00-XX-0000"
                class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 uppercase"
                value={vehicalnum}
                onChange={(e)=>{setvehicleNumber(e.target.value)}}
              />
            </div>

            <button
              class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              onClick={handleclick}
            >
              Submit
            </button>
          </form>
          
        </section>
      </div>
    </div>
  );
}

export default Home_page;
