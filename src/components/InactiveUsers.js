import React, { useState, useEffect, useContext } from 'react';
import { Table, Container, Row } from 'react-bootstrap';
import { getInactiveUsers } from '../service/AdminService';

const InactiveUsers = () => {

    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userList = await getInactiveUsers();
                setInactiveUsers(userList);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getDaysSinceLoggedIn = (timestamp) => {
        const millisecondsSinceLastLogin = Date.now() - timestamp;
        return Math.floor(millisecondsSinceLastLogin / (1000 * 60 * 60 * 24));
    }

    return (
        <Container className="text-center mt-4">
            <Row>
                <Container className='mb-4'>
                    <h1>Inactive Users List</h1>
                </Container>
            </Row>

        {isLoading ? ( // Render loading indicator while data is being fetched
                <h2>Loading...</h2>
            ) : (
            <Table striped bordered hover className='mb-4'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Days Since Last Logged In</th>
                    </tr>
                </thead>
                <tbody>
                {inactiveUsers.map((user) => {
                    return (
                    <tr  key={user.username}>
                        <td>{user.username}</td>
                        <td>{getDaysSinceLoggedIn(user.loginTimestamp)}</td>
                    </tr>
                    );
                })}
                </tbody>
            </Table>
       
         
        )}
        </Container>
    );
};

export default InactiveUsers;