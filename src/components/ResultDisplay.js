import React from 'react';
import { Check, X } from 'react-bootstrap-icons';


function ResultDisplay({results}){
    if (!results || results.length === 0) {
      console.log("results - " + results);
        return <p>No results to display</p>;
        
      }
    
      return (
        <div >
          <table className='table'  style={{ background: 'linear-gradient(to bottom, #03045e, #023e8a)' }}>
            <thead>
              <tr className='table-primary'>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Submitted Answer</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody >
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{result.correctAnswer}</td>
                  <td>{result.submittedAnswer}</td>
                  <td>{result.isCorrect ? (
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

    
