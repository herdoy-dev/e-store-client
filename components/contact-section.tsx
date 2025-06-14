import { Container, Flex } from "@radix-ui/themes";
import ContactForm from "./contact-form";

const ContactSection = () => {
  return (
    <section className="py-16">
      <Container className="px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Get in Touch
        </h3>
        <Flex align="center" justify="center" className="w-full">
          <ContactForm />
        </Flex>
      </Container>
    </section>
  );
};

export default ContactSection;
