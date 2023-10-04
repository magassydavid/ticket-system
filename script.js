// Function to handle form submission
function submitTicket(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  // Generate a random ticket ID
  function makeTicketId() {
    return ("" + Math.random()).substring(2, 8);
  }

  // Get the current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  // Create a new ticket object with the form data and current date
  const newTicket = {
    ID: makeTicketId(),
    dateAdded: formattedDate,
    status: "új",
    title: title,
    description: description
  };

  // Fetch the current JSON data
fetch('data.json')
.then(response => {
  if (!response.ok) {
    throw new Error('Nem sikerült betölteni a JSON fájlt.');
  }
  return response.text(); // JSON helyett szövegként olvassuk be
})
.then(jsonText => {
  let data = { tickets: [] };

  try {
    // Próbáld meg a JSON szöveget objektummá alakítani
    data = JSON.parse(jsonText);
  } catch (error) {
    console.error('Hiba történt a JSON fájl olvasásakor:', error);
  }

  // Add the new ticket to the existing data
  data.tickets.push(newTicket);

  // Update the JSON file with the modified data
  return fetch('data.json', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
})
.then(() => {
  // Add the ticket to the table
  addTicketToTable(newTicket);

  // Clear the form fields
  document.getElementById('ticketForm').reset();
})
.catch(error => {
  console.error('Hiba történt a ticket mentése során:', error);
});

}

// Function to add a ticket to the table
function addTicketToTable(ticket) {
  const ticketTable = document.getElementById('ticketList');
  const row = document.createElement('tr');

  // Apply a class based on the ticket status
  row.classList.add(ticket.status);

  row.innerHTML = `
    <td>${ticket.ID}</td>
    <td>${ticket.dateAdded}</td>
    <td>
      <select class="status-dropdown" data-ticket-id="${ticket.ID}">
        <option value="új" ${ticket.status === "új" ? "selected" : ""}>Új</option>
        <option value="teszt-fázis" ${ticket.status === "teszt-fázis" ? "selected" : ""}>Teszt Fázis</option>
        <option value="kész" ${ticket.status === "kész" ? "selected" : ""}>Kész</option>
      </select>
    </td>
    <td>${ticket.title}</td>
    <td>${ticket.description}</td>
  `;
  ticketTable.appendChild(row);
}

// Attach the form submission handler
document.getElementById('ticketForm').addEventListener('submit', submitTicket);

// Handle changes in the status dropdown (listen for changes in the table)
document.getElementById('ticketList').addEventListener('change', function (event) {
  if (event.target.classList.contains('status-dropdown')) {
    const ticketId = event.target.getAttribute('data-ticket-id');
    const selectedStatus = event.target.value;

    alert('Státuszváltáskor értesíthetnénk a fejlesztőt, vagy a felhasználót.');

    // Update the ticket status in the data (you can save this in your backend)
    console.log(`Ticket ${ticketId} státusza megváltozott: ${selectedStatus}`);

    // Get the table row corresponding to the ticket
    const ticketRow = event.target.closest('tr');

    // Remove the old status class
    ticketRow.classList.remove('új', 'teszt-fázis', 'kész');

    // Add the class based on the selected status
    ticketRow.classList.add(selectedStatus);
  }
});
