
const Gallery = () => {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-medium">
              Image {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
