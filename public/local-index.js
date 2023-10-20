function previewImage(event) {
  var preview = document.getElementById('imagePreview');
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function () {
      preview.src = reader.result;
      document.getElementById('imageContainer').style.display = 'block';
  }

  if (file) {
      reader.readAsDataURL(file);
  }
}

function submitToDB(event) {
  event.preventDefault();
  let confirmation = confirm("Confirm submit to MongoDB?");
  if (confirmation) {
      const formData = new FormData();
      const fileInput = document.getElementById('myFile');
      formData.append('file', fileInput.files[0]);

      fetch('/saveImage', {
          method: 'POST',
          body: formData
      })
      .then(response => response.text())
      .then(data => {
          alert(data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
}
