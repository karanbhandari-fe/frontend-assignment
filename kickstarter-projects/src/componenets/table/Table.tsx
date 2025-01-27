import React from "react";

interface TableProps {
  data: { "s.no": number; "percentage.funded": number; "amt.pledged": number; title: string }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table className="table" aria-label="Kickstarter Projects Table">
    <caption>List of highly-rated Kickstarter projects</caption>
    <thead>
      <tr>
        <th scope="col">S.No.</th>
        <th scope="col">Title</th>
        <th scope="col">Percentage Funded</th>
        <th scope="col">Amount Pledged</th>
      </tr>
    </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item["s.no"] + 1}>
            <td>{item["s.no"] + 1}</td>
            <td>{item["title"]}</td>
            <td>{item["percentage.funded"]}</td>
            <td>{item["amt.pledged"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
