const DualImageUpload = () => {
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);

  const handleImageChange = (event, setImageFunction) => {
    const file = event.target.files[0];

    if (file) {
      // Use FileReader to convert the selected file to a data URL
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageFunction(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => handleImageChange(event, setSelectedImage1)}
        />
        {selectedImage1 && (
          <div>
            <img
              src={selectedImage1}
              alt="Selected 1"
              style={{ maxWidth: '50%', maxHeight: '100px' }}
            />
          </div>
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => handleImageChange(event, setSelectedImage2)}
        />
        {selectedImage2 && (
          <div>
            <img
              src={selectedImage2}
              alt="Selected 2"
              style={{ maxWidth: '50%', maxHeight: '100px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DualImageUpload;

