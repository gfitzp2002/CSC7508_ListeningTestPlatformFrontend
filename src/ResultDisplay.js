import React from 'react';
import { Check, X } from 'react-bootstrap-icons';


function ResultDisplay({results}){
    if (!results || results.length === 0) {
        return <p>No results to display</p>;
      }
    
      return (
        <div>
          <h2>Results</h2>
          <table className='table'>
            <thead>
              <tr className='table-primary'>
                <th>Question</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.questionIndex + 1}</td>
                  <td>{result.result ? (
                    <Check className='text-success' />
                  ) :(
                    <X className='text-danger' />
                  ) }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
    export default ResultDisplay;

    
