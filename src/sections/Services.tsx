
const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">test</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Web Design', 'Development', 'SEO Optimization'].map((service) => (
            <div key={service} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">{service}</h3>
              <p className="text-gray-600">Services test {service.toLowerCase()} test</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
