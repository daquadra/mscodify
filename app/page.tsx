import Layout from "@/components/layout";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Process from "@/components/process";
import OwnProducts from "@/components/own-products";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Process />
      <OwnProducts />
      <Contact />
    </Layout>
  );
}
