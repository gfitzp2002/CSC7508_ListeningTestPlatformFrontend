import React, { useState, useEffect, useContext } from 'react';
import { getLoginStats } from '../service/AdminService';
import { MessageContext } from '../context/MessageContext';
import { Button, Table, Form, Container, Col, Row, Badge} from 'react-bootstrap';

const LoginStatsByMonth = () => {

    const [loginStats, setLoginStats] = useState([]);
    const { showToast } = useContext(MessageContext); 


    useEffect(() => {
        const fetchLoginStats = async () => {
            const fetchedStats = await getLoginStats();
            setLoginStats(fetchedStats);
        };

        fetchLoginStats();
        
        }, []);

    // Group the data by username
    const userGroups = loginStats.reduce((groups, entry) => {
        const { username, month, year, daysLogged } = entry;
        const monthYear = `${month}-${year}`;

        if (!groups[username]) {
            groups[username] = {};
        }

        if (!groups[username][monthYear]) {
            groups[username][monthYear] = daysLogged; // Assign daysLogged directly to the key
        } else {
            groups[username][monthYear] += daysLogged; // Increment daysLogged if the key already exists
        }
        console.log("Groups - " + JSON.stringify(groups));
        return groups;
    }, {});
      
    const years = [...new Set(loginStats.map((entry) => entry.year))];  

    const renderTableForYear = (year) => {
        // Get unique months from data for the given year
        const months = [...new Set(loginStats.filter(entry => entry.year === year).map(entry => entry.month))];
        
        return (
          <Table striped bordered hover key={year}>
            <thead>
              <tr>
                <th>Username</th>
                {months.map(month => (
                  <th key={month}>{new Date(null, month - 1).toLocaleString('default', { month: 'long' })}</th>
                ))}
              </tr>
            </thead>
            <tbody>
                {Object.keys(userGroups).map(username => (
                    <tr key={username}>
                        <td>{username}</td>
                        {months.map(month => {
                            const daysLogged = userGroups[username][`${month}-${year}`] || '-';
                            return <td key={`${username}-${month}`}>{daysLogged}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
          </Table>
        );
      };
    
    return (
        <Container className='text-center mt-4'>
            <main>
                <Row className='mt-4'>
                {years.map(year => (
                    <div key={year}>
                        <h3>{year}</h3>
                        {renderTableForYear(year)}
                    </div>
                ))}
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <Button variant="primary">Back</Button>
                    </Col>
                </Row>
            </main>
        </Container>
    );
};

export default LoginStatsByMonth;
