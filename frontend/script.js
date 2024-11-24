document.addEventListener('DOMContentLoaded', function() {
    // Show all medicines when 'Show All' is clicked
    document.getElementById('showAll').addEventListener('click', function(event) {
        clearContent();  // Clear any previous content
        showAllMedicines();  // Show all medicines
        document.getElementById('searchContainer').style.display = 'none'; // Hide search bar
    });
    
    // Show search bar when 'Search Medicine' is clicked
    document.getElementById('searchMedicine').addEventListener('click', function(event) {
        clearContent();  // Clear any previous content
        document.getElementById('searchContainer').style.display = 'block'; // Show search bar
        document.getElementById('searchResults').style.display = 'none';  // Hide previous search results
    });

    // Handle the actual search functionality when search button is clicked
    document.getElementById('searchButton').addEventListener('click', function() {
        const searchQuery = document.getElementById('searchInput').value.trim();
        if (searchQuery) {
            searchMedicine(searchQuery);  // Perform the search
        }
    });

    // Show form when 'Add Medicine' is clicked
    document.getElementById('addMedicine').addEventListener('click', function(event) {
        clearContent();  // Clear any previous content
        document.getElementById('addMedicineForm').style.display = 'block'; // Show search bar
    });

    document.getElementById('addButton').addEventListener('click', function() {
        const medName = document.getElementById('newMedicineName').value.trim();
        const medPrice = document.getElementById('newMedicinePrice').value.trim();
        if (medName && medPrice) {
            addMedicine(medName, medPrice);  //Perform the add
        }
    });
});

// Function to clear any content on the page (medicines list, search results)
function clearContent() {
    // Clear the displayed medicines list
    document.getElementById('medicinesTable').innerHTML = '';
    // Clear the search results
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchResults').style.display = 'none'; // Hide search results section
    // Clear input fields for search and add form
    document.getElementById('searchInput').value = '';
    document.getElementById('newMedicineName').value = '';
    document.getElementById('newMedicinePrice').value = '';
    // Hide any form or search container that might be visible
    document.getElementById('searchContainer').style.display = 'none';
    document.getElementById('addMedicineForm').style.display = 'none';
}


// Create a table from medicine data
function createTable(medicines) {
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    
    const headerName = document.createElement('th');
    headerName.textContent = 'Medicine';
    headerRow.appendChild(headerName);

    const headerPrice = document.createElement('th');
    headerPrice.textContent = 'Price';
    headerRow.appendChild(headerPrice);

    const body = table.createTBody();
    medicines.forEach(medicine => {
        const row = body.insertRow();
        
        const cellName = row.insertCell();
        cellName.textContent = medicine.name || 'N/A';

        const cellPrice = row.insertCell();
        cellPrice.textContent = medicine.price !== null ? `$${medicine.price.toFixed(2)}` : 'N/A';
    });

    return table;
}

// Function to show all medicines
function showAllMedicines() {
    fetch('http://localhost:8000/medicines')
        .then(response => response.json())
        .then(data => {
            const medicinesTable = document.getElementById('medicinesTable');
            if (data.medicines && data.medicines.length > 0) {
                const table = createTable(data.medicines);
                medicinesTable.appendChild(table);
            } else {
                medicinesTable.textContent = 'No medicines available.';
            }
        })
        .catch(error => console.error('Error fetching medicines:', error));
}

// Function to perform a medicine search
function searchMedicine(query) {
    fetch(`http://localhost:8000/medicines/${query}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('searchResults');
            if (data && data.name) {  // If medicine found
                const table = createTable([data]);  // Create table for a single medicine
                searchResults.appendChild(table);
                searchResults.style.display = 'block'; // Show the search results section
            } else {
                searchResults.textContent = 'No medicines found for that search.';
                searchResults.style.display = 'block'; // Show the error message if no medicine found
            }
        })
        .catch(error => console.error('Error searching for medicine:', error));
}

function addMedicine(name, price) {
    fetch('http://localhost:8000/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ name, price }),
    })
    .then(response => response.json())
    .then(data => {
        clearContent(); // Clear content before showing new medicine
        searchMedicine(name); // Show the newly added medicine
    })
    .catch(error => console.error('Error adding medicine:', error));
}
