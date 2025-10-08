import Footer from "@/components/general/footer";
import Header from "@/components/general/header";
import Sidebar from "@/components/general/sidebar";
import AuthProvider from "@/components/providers/authProvider";
import MenuProvider from "@/components/providers/menu-provider";
import SocketProvider from "@/components/providers/socketProvider";
import { SignedOut } from "@clerk/nextjs";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SocketProvider>
        <AuthProvider>
          <MenuProvider>
            <Header />
            <div className="flex flex-1">
              <Sidebar />

              <main className="flex-1 px-7">{children}</main>
            </div>
          </MenuProvider>
          <SignedOut>
            <Footer />
          </SignedOut>
        </AuthProvider>
      </SocketProvider>
    </>
  );
}
