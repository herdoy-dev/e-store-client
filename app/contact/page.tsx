import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container, Grid } from "@radix-ui/themes";

export default function ContactPage() {
  const contactMethods = [
    {
      name: "Customer Support",
      description: "Get help with orders, returns, or product questions",
      email: "support@yourecommerce.com",
      hours: "24/7",
    },
    {
      name: "Business Inquiries",
      description: "For partnerships, wholesale, and brand collaborations",
      email: "business@yourecommerce.com",
      hours: "Mon-Fri, 9am-5pm",
    },
    {
      name: "Press & Media",
      description: "For media inquiries and press releases",
      email: "press@yourecommerce.com",
      hours: "Mon-Fri, 9am-5pm",
    },
  ];

  return (
    <>
      <Navbar />
      <Container className="px-4 py-12">
        <section className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            We&apos;re Here to Help
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have questions or feedback? We&apos;d love to hear from you. Reach
            out through our form or directly via email.
          </p>
        </section>

        <section className="space-y-10">
          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="5">
            {contactMethods.map((method) => (
              <Card key={method.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>{method.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <a
                      href={`mailto:${method.email}`}
                      className="text-primary hover:underline"
                    >
                      {method.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Hours:</span>
                    <span>{method.hours}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
          {/* FAQ CTA */}
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-lg">Need Quick Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Many common questions are answered in our FAQ section.
              </p>
              <Button variant="outline">Visit Help Center</Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 shadow-lg p-6 rounded-3xl border border-gray-100">
          <Grid columns={{ initial: "1", md: "2fr 3fr" }}>
            <div className="flex items-center">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Ecommerce Inc.</h3>
                <address className="not-italic text-muted-foreground">
                  123 Commerce Street
                  <br />
                  San Francisco, CA 94107
                  <br />
                  United States
                </address>
                <div>
                  <Button variant="outline" className="mr-3">
                    Get Directions
                  </Button>
                  <Button variant="outline">Call: +1 (555) 123-4567</Button>
                </div>
              </div>
            </div>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
                <span className="text-lg font-medium">Map View</span>
              </div>
            </div>
          </Grid>
        </section>
      </Container>
      <Footer />
    </>
  );
}
