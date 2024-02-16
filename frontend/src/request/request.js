import axios from 'axios';


// Makeing API request using axios.

export default async function axiosRequest(APIUrl, method = 'GET', data = null, headers = {}) {

    const absoluteUrl = `http://localhost:8000/${APIUrl}`

    try {
        const config = {
            method,
            absoluteUrl,
            data,
            headers,
            // You can customize other options like timeout, etc. here
        };

        const response = await axios(config);

        // Return the response.
        return response;

    } catch (error) {
        // Handle any errors that occurred during the api request.
        console.error('Error during fetch:', error.message);
        throw error;
    }

};


// Makeing API request using fetch.

export async function fetchRequest(APIUrl, method = 'GET', data = null, headers = {}) {

    const absoluteUrl = `http://localhost:8000/${APIUrl}`

    try {
        const response = await fetch(absoluteUrl, {
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : null,
        });

        // Check if the request was successful (status code in the range 200-299).
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse and return the response JSON.
        return await response.json();

    } catch (error) {
        // Handle any errors that occurred during the fetch.
        console.error('Error during fetch:', error.message);
        throw error; // You can choose to handle or rethrow the error.
    }
}


