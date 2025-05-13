
document.getElementById('registrationForm').addEventListener('submit', function(event) {

    event.preventDefault(); // Prevents page reload on form submit

    const employeeId = document.getElementById('employeeId').value;

    const name = document.getElementById('name').value;

    const dateJoined = document.getElementById('dateJoined').value;

    const designation = document.getElementById('designation').value;

    const duration = document.getElementById('duration').value;

    // Display submitted data

    document.getElementById('formOutput').innerHTML = `

        Registration Successful!<br><br>

        Employee ID: ${employeeId} <br>

        Name: ${name} <br>

        Date Joined: ${dateJoined} <br>

        Designation: ${designation} <br>

        Duration: ${duration} months

    `;

    // Clear form after submission

    document.getElementById('registrationForm').reset();

});



