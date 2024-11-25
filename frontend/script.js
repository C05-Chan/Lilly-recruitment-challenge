// Elements for search, form controls, and tables
const searchContainer = document.querySelector('#searchContainer');
const searchResults = document.querySelector('#searchResults');
const medicinesTable = document.querySelector('#medicinesTable');
const addMedicineForm = document.querySelector('#addMedicineForm');
const updateMedicineForm = document.querySelector('#updateMedicineForm');
const updateFields = document.querySelector('#updateFields');
const deleteMedicineForm = document.querySelector('#deleteMedicineForm');

document.addEventListener('DOMContentLoaded', function () {
    // Show all medicines when 'Show All' button is clicked
    document.querySelector('#showAll').addEventListener('click', function () {
        clearContent(); // Clear previous content
        displayAllMedicines(); // Fetch and show all medicines
    });

    // Display search bar when 'Search Medicine' is clicked
    document.querySelector('#searchMedicine').addEventListener('click', function () {
        clearContent();
        searchContainer.style.display = 'block'; // Show search bar
        searchResults.style.display = 'none'; // Hide previous results
    });

    // Execute search when 'Search' button is clicked
    document.querySelector('#searchButton').addEventListener('click', function () {
        const searchQuery = document.querySelector('#searchInput').value.trim();
        if (searchQuery) {
            searchForMedicine(searchQuery); // Search for the medicine by name
        }
    });

    // Show Add Medicine form when 'Add Medicine' button is clicked
    document.querySelector('#addMedicine').addEventListener('click', function () {
        clearContent();
        addMedicineForm.style.display = 'block'; // Show the add medicine form
    });

    // Handle Add Medicine form submission
    document.querySelector('#addButton').addEventListener('click', function () {
        const medName = document.querySelector('#newMedicineName').value.trim();
        const medPrice = document.querySelector('#newMedicinePrice').value.trim();

        if (medName && medPrice) {
            const price = parseFloat(medPrice);
            if (price < 0) {
                alert('Please enter a valid, non-negative price.');
                return; // Stop further execution if invalid price
            }
            addNewMedicine(medName, price); // Proceed to add medicine
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Show Update Medicine form when 'Update Medicine' button is clicked
    document.querySelector('#updateMedicine').addEventListener('click', function () {
        clearContent();
        updateMedicineForm.style.display = 'block'; // Show update form
    });

    // Find medicine to update when 'Find Medicine' button is clicked
    document.querySelector('#findUpdateMedicineButton').addEventListener('click', function () {
        const medicineName = document.querySelector('#medicineToUpdate').value.trim();
        if (medicineName) {
            searchForMedicineToUpdateOrDelete(medicineName, true);
        }
    });

    // Update the price of a medicine
    document.querySelector('#updatePriceButton').addEventListener('click', function () {
        const newPrice = document.querySelector('#newPrice').value.trim();
        const medicineName = document.querySelector('#medicineToUpdate').value.trim();
        if (newPrice && medicineName) {
            updateMedicinePrice(medicineName, newPrice);
        }
    });

    // Show Delete Medicine form when 'Delete Medicine' button is clicked
    document.querySelector('#deleteMedicine').addEventListener('click', function () {
        clearContent();
        deleteMedicineForm.style.display = 'block'; // Show delete form
    });

    // Find medicine to delete when 'Find Medicine' button is clicked
    document.querySelector('#findDeleteMedicineButton').addEventListener('click', function () {
        const medicineName = document.querySelector('#medicineToDelete').value.trim();
        if (medicineName) {
            searchForMedicineToUpdateOrDelete(medicineName, false);
        }
    });

    // Delete a medicine when 'Delete' button is clicked
    document.querySelector('#DeleteMedicineButton').addEventListener('click', function () {
        const medicineName = document.querySelector('#medicineToDelete').value.trim();
        if (medicineName) {
            deleteMedicine(medicineName);
        }
    });
});

// Clear all dynamic content from the page
function clearContent() {
    medicinesTable.innerHTML = ''; // Clear medicines table
    searchResults.innerHTML = ''; // Clear search results
    searchResults.style.display = 'none'; // Hide search results container
    document.querySelector('#searchInput').value = ''; // Clear search input
    document.querySelector('#newMedicineName').value = ''; // Clear add medicine name field
    document.querySelector('#newMedicinePrice').value = ''; // Clear add medicine price field
    searchContainer.style.display = 'none'; // Hide search section
    addMedicineForm.style.display = 'none'; // Hide add form
    updateMedicineForm.style.display = 'none'; // Hide update form
    updateFields.style.display = 'none'; // Hide update fields
    deleteMedicineForm.style.display = 'none'; // Hide delete form
}

// Create a table to display medicines
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
        cellPrice.textContent = (medicine.price !== null && medicine.price !== undefined) 
            ? `$${medicine.price.toFixed(2)}` 
            : 'N/A';
    });
    return table;
}

// Fetch and display all medicines
function displayAllMedicines() {
    fetch('http://localhost:8000/medicines', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.medicines && data.medicines.length > 0) {
                const table = createTable(data.medicines);
                medicinesTable.appendChild(table); // Add table to the page
            } else {
                medicinesTable.textContent = 'No medicines available.';
            }
        })
        .catch(error => {
            console.error('Error fetching medicines:', error);
            alert('An error occurred while fetching medicines. Please try again later.');
        });
}

// Search for a medicine by name
function searchForMedicine(query) {
    fetch(`http://localhost:8000/medicines/${query}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error); // Show error if medicine is not found
            } else if (data.name) {
                searchResults.innerHTML = '';
                const table = createTable([data]); // Display medicine data
                searchResults.appendChild(table);
                searchResults.style.display = 'block';
            } else {
                alert('No medicines found for that search.');
            }
        })
        .catch(error => {
            console.error('Error searching for medicine:', error);
            alert('An error occurred while searching for the medicine. Please try again later.');
        });
}

// Add a new medicine
function addNewMedicine(name, price) {
    fetch('http://localhost:8000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: name, price: price }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Medicine added successfully.');
        clearContent();
        displayAllMedicines();
    })
    .catch(error => {
        console.error('Error adding medicine:', error);
        alert('An error occurred while adding the medicine. Please try again later.');
    });
}

// Search for a medicine for update or delete
function searchForMedicineToUpdateOrDelete(query, isUpdate) {
    fetch(`http://localhost:8000/medicines/${query}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else if (data.name) {
                searchResults.innerHTML = '';
                const table = createTable([data]); // Display medicine data
                searchResults.appendChild(table);
                searchResults.style.display = 'block';

                // If updating, show the price update field
                if (isUpdate) {
                    updateFields.style.display = 'block';
                } else {
                    deleteMedicineForm.querySelector('#deleteButton').style.display = 'block';
                }
            }
        })
        .catch(error => {
            console.error('Error searching for medicine:', error);
            alert('An error occurred while searching for the medicine. Please try again later.');
        });
}

// Update the price of a medicine
function updateMedicinePrice(medicineName, newPrice) {
    if (newPrice < 0) {
        alert('Price cannot be negative.');
        return;
    }
    fetch('http://localhost:8000/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: medicineName, price: newPrice }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Price updated successfully.');
        clearContent();
        displayAllMedicines();
    })
    .catch(error => {
        console.error('Error updating medicine price:', error);
        alert('An error occurred while updating the price. Please try again later.');
    });
}

// Delete a medicine
function deleteMedicine(name) {
    fetch('http://localhost:8000/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: name }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Medicine deleted successfully.');
        clearContent();
        displayAllMedicines();
    })
    .catch(error => {
        console.error('Error deleting medicine:', error);
        alert('An error occurred while deleting the medicine. Please try again later.');
    });
}