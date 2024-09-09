import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar.jsx";
import Footer from "@/components/footer/footer.jsx"
import Main from "@/components/home/home.jsx"

export default function Home() {
  return (
    <>
    <Navbar />
    <Main />
    <Footer />
    </>
  );
}
