async function submitToDB(event) {
  event.preventDefault();
  let confirmation = confirm("Confirm submit to MongoDB?");
  if (confirmation) {
      const fileInput = document.getElementById('myFile');
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      try {
          const response = await fetch('/saveImage', {
              method: 'POST',
              body: formData
          });
          const data = await response.json();
          const imageContainer = document.getElementById('imageContainer');
          const imagePreview = document.getElementById('imagePreview');
          imagePreview.src = data.imageSrc;
          imageContainer.style.display = 'block';
          alert(data.message);
      } catch (error) {
          console.error('Error:', error);
      }
  }
}
