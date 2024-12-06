import { Outlet } from "react-router-dom";
// import FloatingShape from "../components/FloatingShape";
import Navbar from "../components/Navbar";

function AppLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {/* <main className="min-h-screen bg-gradient-to-br from-gray-900 to-sky-800 flex items-center justify-center relative overflow-hidden"> */}
      <main>
        {/* <FloatingShape
          color="bg-blue-500"
          size="w-80 h-80"
          top="-5%"
          left="10%"
          delay={0}
        /> */}

        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default AppLayout;
