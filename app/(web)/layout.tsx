import Footer from "@/components/footer";
import GetInTouch from "@/components/get-in-touch";
import Header from "@/components/header";
import GridColumns from "@/components/providers/grid-provider";

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GridColumns />
      <Header />
      {children}
      <GetInTouch />
      <Footer />
    </>
  );
}
