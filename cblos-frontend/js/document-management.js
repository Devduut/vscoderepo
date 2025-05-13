document.getElementById("docForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Uploading documents for Application ID:", formData.get("applicationId"));
  for (let file of formData.getAll("documents")) {
    console.log("File:", file.name);
  }
});