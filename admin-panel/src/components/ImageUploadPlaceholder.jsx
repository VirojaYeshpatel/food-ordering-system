function ImageUploadPlaceholder() {
  return (
    <section>
      <h3>Image Upload (Firebase Storage Placeholder)</h3>
      <p>
        TODO: Integrate Firebase Storage upload flow. This placeholder reserves UI space for
        selecting files and showing upload progress.
      </p>
      <ul>
        <li>// Firebase storage config: import storage from your firebase config module.</li>
        <li>// Firebase storage config: create a storage ref per restaurant/menu image path.</li>
        <li>// Firebase storage config: upload bytes and retrieve download URL.</li>
      </ul>
      <button type="button" disabled>
        Upload Image (coming soon)
      </button>
    </section>
  );
}

export default ImageUploadPlaceholder;
