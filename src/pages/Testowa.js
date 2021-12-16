import React, { useEffect, useState } from "react";
import Navbar from "../navigations/Navbar";
import Footer from "../navigations/Footer";

import axios from "axios";

import { Box } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Testowa = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:1337/restaurants").then((response) => {
      setRestaurants(response.data);
      setLoading(false);
      console.log(response);
    });
    return () => {};
  }, []);

  return (
    <div>
      <Navbar />

      <Box className="bg-blue-500" w="100%" h="300px" p={4} color="white">
        <Center h="100%" className="flex flex-col gap-4">
          <Link href="https://blocks.wickedtemplates.com/" isExternal>
            Wicked Templates: https://blocks.wickedtemplates.com/ <ExternalLinkIcon mx="2px" />
          </Link>

          <Link href="https://chakra-ui.com" isExternal>
            Chakra Design system: https://chakra-ui.com <ExternalLinkIcon mx="2px" />
          </Link>
          <div className="bg-pink-500 w-[500px]">JIT TEST</div>
          <div className="bg-[#123123] w-500px">CUSTOM [COLOR] - jit</div>
        </Center>
      </Box>

      <section>
        {loading
          ? "LOADING"
          : restaurants?.map((res, index) => (
              <div className="container items-center px-5 pt-6 lg:px-20">
                <div className="p-6 mx-auto bg-white border rounded-lg shadow-xl lg:w-1/2">
                  <div className="flex flex-col items-start py-2 rounded-lg lg:flex-row">
                    <div className="flex items-center justify-center w-full lg:justify-start lg:w-1/2">
                      <img
                        src={res.photoUrl}
                        alt="placeholder"
                        className="rounded-lg object-cover max-h-[250px]"
                      />
                    </div>
                    <div className="flex flex-col w-full text-blueGray-500 lg:ml-4">
                      <h2 className="mt-4 mb-8 text-xs font-semibold tracking-widest text-black uppercase lg:mt-0 title-font">
                        {res.name}
                      </h2>
                      <p className="mb-3 text-base leading-relaxed text-blueGray-500">{res.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </section>
      <div className="container items-center px-5 py-12 lg:px-20">
        <div className="p-6 mx-auto bg-white border rounded-lg shadow-xl lg:w-1/2">
          <div className="flex flex-col items-start py-2 rounded-lg lg:flex-row">
            <div className="flex items-center justify-center w-full lg:justify-start lg:w-1/2">
              <img
                src="https://dummyimage.com/200x200/F3F4F7/8693ac"
                alt="placeholder"
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full text-blueGray-500 lg:ml-4">
              <h2 className="mt-4 mb-8 text-xs font-semibold tracking-widest text-black uppercase lg:mt-0 title-font">
                {" "}
                great info right here
              </h2>
              <p className="mb-3 text-base leading-relaxed text-blueGray-500">
                {" "}
                If any Environment Variables values are changed between Deployments, deduplication will always
                be bypassed. So you know.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testowa;
