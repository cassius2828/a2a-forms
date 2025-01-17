import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex justify-center items-start bg-neutral-950 min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
