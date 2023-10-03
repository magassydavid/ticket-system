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
  const ticket = {
    ID: makeTicketId(),
    dateAdded: formattedDate,
    status: "új", // Default status is "új"
    title: title,
    description: description
  };

  // Add the ticket to the table
  addTicketToTable(ticket);

  // Clear the form fields
  document.getElementById('ticketForm').reset();
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
document.getElementById('ticketList').addEventListener('change', function(event) {
  if (event.target.classList.contains('status-dropdown')) {
    const ticketId = event.target.getAttribute('data-ticket-id');
    const selectedStatus = event.target.value;

    alert('státusz váltásakor mehetne email a fejlesztőnek, hogy pl új ticket van, illetve ha a fejlesztő tesztre állítja akkor a usernek, hogy tesztelni való van');

    // Update the ticket status in the data (you can save this in your backend)
    console.log(`Ticket ${ticketId} status changed to: ${selectedStatus}`);

    // Get the table row corresponding to the ticket
    const ticketRow = event.target.closest('tr');

    // Remove the old status class
    ticketRow.classList.remove('új', 'teszt-fázis', 'kész');

    // Add the class based on the selected status
    ticketRow.classList.add(selectedStatus);
  }
});
