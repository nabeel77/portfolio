import React from 'react';

const Table = ({ headers, data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {data.map((head, index) => (
                <td key={index}>{row[head]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
