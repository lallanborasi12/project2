import React, { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../common/Loader";
import { DataLayer } from "../common/Function";
const HomeController = React.lazy(() =>
  import("../../controllers/HomeController")
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching (replace this with your actual data fetching logic)
    const fetchData = async () => {
      try {
        // Simulating a delay for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 150));

        // Once the data is fetched, update the isLoading state
        setIsLoading(false);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching data:", error);
      }
    };

    // Push the event to the dataLayer
    const dataLayer_res = DataLayer({
      event: "genderPageView",
      stage: "Gender Selection",
    });

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once

  // If data is still loading, display the Loader
  if (isLoading) {
    return <Loader />;
  }

  // If data has been loaded, display the HomeController
  return (
    <Suspense fallback={<Loader />}>
      <HomeController />
    </Suspense>
  );
};

export default React.memo(Home);
