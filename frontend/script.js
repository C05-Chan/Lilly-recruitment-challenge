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

    // Show Update Medicine form when 'Update Medicine' is clicked
    document.getElementById('updateMedicine').addEventListener('click', function() {
        clearContent();  // Clear any previous content
        document.getElementById('updateMedicineForm').style.display = 'block'; // Show the update form
    });

    // Handle the Find Medicine button click
    document.getElementById('findUpdateMedicineButton').addEventListener('click', function() {
        const medicineName = document.getElementById('medicineToUpdate').value.trim();
        if (medicineName) {
            searchMedicineUpdateDelete(medicineName, true);
        }
    });

    document.getElementById('updatePriceButton').addEventListener('click', function() {
        const newPrice = document.getElementById('newPrice').value.trim();
        const medicineName = document.getElementById('medicineToUpdate').value.trim();

        if (newPrice && medicineName) {
            updateMedicinePrice(medicineName, newPrice)};
    });

    // Show Update Medicine form when 'Update Medicine' is clicked
    document.getElementById('deleteMedicine').addEventListener('click', function() {
        clearContent();  // Clear any previous content
        document.getElementById('deleteMedicineForm').style.display = 'block'; // Show the update form
    });

    // Handle the Find Medicine button click
    document.getElementById('findDeleteMedicineButton').addEventListener('click', function() {
        const medicineName = document.getElementById('medicineToDelete').value.trim();
        if (medicineName) {
            searchMedicineUpdateDelete(medicineName, false);
        }
    });

    document.getElementById('DeleteMedicineButton').addEventListener('click', function() {
        const medicineName = document.getElementById('medicineToDelete').value.trim();

        if (medicineName) {
            deleteMedicine(medicineName)};
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
    document.getElementById('updateMedicineForm').style.display = 'none';
    document.getElementById('updateFields').style.display = 'none';
    document.getElementById('deleteMedicineForm').style.display = 'none';
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
    fetch('http://localhost:8000/medicines', {
        method: 'GET'
    })
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
    fetch(`http://localhost:8000/medicines/${query}`, {
        method: 'GET' // Explicitly specify the GET method
    })
    .then(response => response.json())
    .then(data => {
        const searchResults = document.getElementById('searchResults');
        if (data && data.name) {  // If medicine found
            document.getElementById('searchResults').innerHTML = '';
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({ name: String(name), price: String(price) }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);  // Success message from the backend
            clearContent(); // Clear content before showing new medicine
            showAllMedicines(); // Show the newly added medicine
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error adding medicine:', error));
}

// Function to search for a medicine specifically for the Update Medicine form
function searchMedicineUpdateDelete(query,isUpdate) {
    fetch(`http://localhost:8000/medicines/${query}`, {
        method: 'GET' // Explicitly specify the GET method
    })
    .then(response => response.json())
    .then(data => {
        const searchResults = document.getElementById('searchResults');
        const updateFields = document.getElementById('updateFields');
        const deleteButton = document.getElementById('deleteButton');
            
        if (data && data.name) {  // If medicine is found
            searchResults.innerHTML = '';  // Clear previous results
            const table = createTable([data]);  // Create table for a single medicine
            searchResults.appendChild(table);
            searchResults.style.display = 'block'; // Show the search results section
                
            // Show the updateFields section for updating the price
            if(isUpdate == true){
                updateFields.style.display = 'block';
            }else{
                deleteButton.style.display = 'block';
            };
                
        } else {
            searchResults.textContent = 'No medicines found for that search.';
            searchResults.style.display = 'block';  // Show the error message if no medicine found
        }
    })
    .catch(error => console.error('Error searching for medicine:', error));
}

// Function to update the medicine price
function updateMedicinePrice(medicineName, newPrice) {
    fetch('http://localhost:8000/update', {  // Use /update endpoint here
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({name: medicineName, price: newPrice.toString()}),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);  // Success message from the backend
            clearContent(); // Clear current content
            showAllMedicines(); // Refresh the medicines list to show the updated price
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error updating medicine price:', error);
        alert('An error occurred while updating the price. Please try again later.');
    });
}

function deleteMedicine(name) {
    fetch('http://localhost:8000/delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({ name: name }) 
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.message) {
            alert(data.message);  // Success message from the backend
            clearContent(); // Clear the current content
            showAllMedicines(); // Refresh the medicines list after deletion
        } else {
            alert('Failed to delete the medicine. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error deleting medicine:', error);
        alert('An error occurred while deleting the medicine. Please try again later.');
    });
}


