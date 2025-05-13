document.getElementById("loanForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const json = Object.fromEntries(formData.entries());
  console.log("Loan Application Submitted:", json);
});