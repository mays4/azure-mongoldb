async function fetchImage(imageId) {
  try {
    const response = await fetch(`/getImage/${imageId}`);
    const blob = await response.blob();
    const imageContainer = document.getElementById('imageContainer');
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = URL.createObjectURL(blob);
    imageContainer.style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
  }
}

async function submitToDB(event) {
  event.preventDefault();
  let confirmation = confirm('Confirm submit to MongoDB?');
  if (confirmation) {
    const fileInput = document.getElementById('myFile');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
      const response = await fetch('/saveImage', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      fetchImage(data.imageId);
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
