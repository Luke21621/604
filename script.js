// My name is Luke
let filteredData = null;

function processData(data) {
    const summary = document.getElementById('summary');
    const tableBody = document.querySelector('#data-table tbody');

    if (data.metadata) {
        summary.innerHTML += `<strong>${data.metadata.title || 'Data Summary'}</strong><br>`;
        summary.innerHTML += `${data.metadata.count || 'N/A'} items retrieved.<br><br>`;
    }
    // Clear the table body
    tableBody.innerHTML = '';

    if (Array.isArray(data)) {
        data.forEach(item => {
            const flag = item.flags.svg || 'N/A'; // Replace with actual field names
            const name = item.name.common || 'N/A';
            const city = item.capital ? item.capital[0] : 'N/A'; // Assuming capital is an array and taking the first element
            const population = item.population || 'N/A';
            const area = item.area || 'N/A';
            const currencies = item.currencies ? Object.values(item.currencies).map(currency => currency.name).join(', ') : 'N/A';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${flag}" alt="Flag" width="30"></td>
                <td>${name}</td>
                <td>${city}</td>
                <td>${population}</td>
                <td>${area}</td>
                <td>${currencies}</td>
            `;
            tableBody.appendChild(row);
        });
    } else if (typeof data === 'object') {
        // Handle single object responses
        const flag = data.flags.svg || 'N/A';
        const name = data.name.common || 'N/A';
        const city = data.capital ? data.capital[0] : 'N/A';
        const population = data.population || 'N/A';
        const area = data.area || 'N/A';
        const currencies = data.currencies ? Object.values(data.currencies).map(currency => currency.name).join(', ') : 'N/A';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${flag}" alt="Flag" width="30"></td>
            <td>${name}</td>
            <td>${city}</td>
            <td>${population}</td>
            <td>${area}</td>
            <td>${currencies}</td>
        `;
        tableBody.appendChild(row);
    }
}

function applyFilter() {
    const populationInput = document.getElementById('population').value;
    const areaInput = document.getElementById('area').value;
    const regionInput = document.getElementById('region').value;

    const filtered = filteredData.filter(country => {
        const populationMatch = !populationInput || country.population > populationInput;
        const areaMatch = !areaInput || country.area > areaInput;
        const regionMatch = !regionInput || country.region === regionInput;

        return populationMatch && areaMatch && regionMatch;
    });
    // Update the table with filtered data
    processData(filtered);
}

// Main function to fetch data
async function main() {
    // Replace this URL with the desired API endpoint
    const urlData = "https://restcountries.com/v3.1/all";

    try {
        const response = await fetch(urlData);

        if (response.ok) {
            const data = await response.json();
            filteredData = data;
            processData(data);// Display all data
        } else {
            console.error(`Received an error from server: ${response.status}`);
        }
    } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
    }
}

// Run the main function when the page loads
document.addEventListener('DOMContentLoaded', main);