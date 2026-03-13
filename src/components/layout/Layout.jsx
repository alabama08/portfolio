import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../common/ScrollToTop";
import "./Layout.css";

const Layout = ({ children, activeSection, isDark, onToggleTheme }) => {
  return (
    <div className="layout">
      <Navbar
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;