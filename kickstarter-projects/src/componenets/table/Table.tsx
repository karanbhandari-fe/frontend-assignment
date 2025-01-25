import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="table" aria-label="Kickstarter Projects Table">
    <caption>List of highly-rated Kickstarter projects</caption>
    <thead>
      <tr>
        <th scope="col">S.No.</th>
        <th scope="col">Percentage Funded</th>
        <th scope="col">Amount Pledged</th>
      </tr>
    </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item["s.no"]}>
            <td>{item["s.no"] + 1}</td>
            <td>{item["percentage.funded"]}</td>
            <td>{item["amt.pledged"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
