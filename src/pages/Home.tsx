import Header from "../components/Header";
import MainContainer from "../components/Main";
import Modal from "../components/modal";

export default function Home() {
  return (
    <section className="w-screen h-screen ">
      <Header />
      <Modal/>
      <MainContainer/>
    </section>
  );
}
