import React,{useState} from 'react';
import { ethers } from "ethers";
import ABI from "./contracts/pollution.json"
import { LinkContainer } from 'react-router-bootstrap';
 function Home_page() {
  let Imag;
const cntadd= "0x0a0C48B0d7c7c7C3469cA5Ee5D82B6e9049d40ba"
  const [vehicalnum,setvehicleNumber]=useState()
  const[Imagg,setImagg]=useState(null)
  async function handleclick(e){
    e.preventDefault();   
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    const signer=provider.getSigner();
     const cnt = new ethers.Contract(cntadd,ABI,signer);
     let txn= await cnt.getTokenId(vehicalnum);
     const TokenId=txn.toNumber()
     let URI=await cnt.getTokenURI(TokenId);
     URI=URI.substring(29);
     let obj=window.atob(URI)
    obj=JSON.parse(obj);
     Imag=obj.image;
     setImagg(Imag);
    console.log(Imag);

    // console.log(obj.image);

    // let img=obj.image.substring(26);
    // img=window.atob(img)

    //  console.log(URI.name)
    //  console.log(URI.image);

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
            {/* <LinkContainer to="/certificate"> */}
            <button
              class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              onClick={handleclick}
            >
              Submit
            </button>
                      {/* </LinkContainer> */}
          </form>
          
        </section>
      </div>
   {  Imagg &&  
   <div class="w-screen h-max py-10 bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 ">
   <div class="bg-white w-7/12 mx-auto p-5 md:p-12 my-5 rounded-lg shadow-2xl">
<img src={Imagg} class="object-cover w-screen"/>
</div></div>}
     </div>
  );
}

export default Home_page;
