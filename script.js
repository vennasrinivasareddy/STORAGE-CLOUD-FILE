function uploadFile() {
  var fileInput = document.getElementById("pdfFile");
  var file = fileInput.files[0];

  var reader = new FileReader();
  reader.onload = function (event) {
    var fileData = event.target.result;
    var params = {
      fileName: file.name,
      fileData: fileData,
    };
    invokeLambdaFunction(params);
  };
  reader.readAsDataURL(file);
}

function invokeLambdaFunction(params) {
  // Replace 'YOUR_API_GATEWAY_URL' with the actual URL of your deployed API Gateway
  var apiGatewayUrl =
    "https://v8uznb2lak.execute-api.us-east-1.amazonaws.com/test";

  fetch(apiGatewayUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("File uploaded successfully. Response: ", data);
      document.getElementById("message").innerHTML =
        "File uploaded successfully!";
    })
    .catch((error) => {
      console.error("Error uploading file: ", error);
      document.getElementById("message").innerHTML = "Error uploading file!";
    });
}
