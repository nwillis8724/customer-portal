import { createContext, useState, useEffect } from "react";

const JobContext = createContext();

function JobProvider({ children }) {
  const [jobSelected, setJobSelected] = useState(null);

  useEffect(() => {
    const storedJobSelected = JSON.parse(localStorage.getItem("jobSelected"));
    if (storedJobSelected) {
      setJobSelected(storedJobSelected);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobSelected", JSON.stringify(jobSelected));
  }, [jobSelected]);

  return (
    <JobContext.Provider value={{ jobSelected, setJobSelected }}>
      {children}
    </JobContext.Provider>
  );
}

export { JobContext, JobProvider };
