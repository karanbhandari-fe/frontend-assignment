import { useState, useEffect } from "react";
import "./styles.css";
import Pagination from "./componenets/pagination/Pagination";
import Table from "./componenets/table/Table";
import { API_END_POINT } from "./Constants";

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  // Fetch data using async/await
  const fetchData = async () => {
    try {
      const response = await fetch(
       API_END_POINT
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    data.length > 0 && (
      <div className="container">
        <header>
          <h1 tabIndex={0}>Highly Rated Kickstarter Projects</h1>
        </header>
        <main id="main-content">
          <Table data={currentRecords} />
          <Pagination
            totalRecords={data.length}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    )
  );
};

export default App;
