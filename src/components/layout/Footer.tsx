const Footer = () => {
  return (
    <footer className="bg-[#e5e5e5] text-[#800000] py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start text-sm">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="font-semibold mb-1 text-base">CEB 2025</h3>
            <p>
              Designed and Developed by <br />
              <span className="font-medium">IT Branch CEB@2025</span>
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-1 md:items-center">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>

          {/* Column 3: Copyright */}
          <div className="md:text-right">
            <p>&copy; {new Date().getFullYear()} CEB. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
