const Footer = () => {
  return (
    <footer className="py-16 mt-12 mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-sm text-gray-600">
            Discover quality products with guaranteed satisfaction. Enjoy a seamless shopping experience with our wide range of items tailored for your needs.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Customer Support</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-900">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Payment Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-600 text-sm">
        © {new Date().getFullYear()} GadgetEra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
