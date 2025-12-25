function imageToPDF() {
  const file = document.getElementById('imgToPdf').files[0];
  if (!file) return alert("Please select an image");

  const reader = new FileReader();
  reader.onload = function () {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.addImage(reader.result, 'JPEG', 10, 10, 180, 160);
    pdf.save("pixora-image.pdf");
  };
  reader.readAsDataURL(file);
}

function compressImage() {
  const file = document.getElementById('compressImg').files[0];
  if (!file) return alert("Please select an image");

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width * 0.6;
    canvas.height = img.height * 0.6;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "pixora-compressed.jpg";
      link.click();
    }, 'image/jpeg', 0.7);
  };
}
