import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container, Grid } from "@radix-ui/themes";

import { ProfileCard } from "@/components/profile-card";
import "./about.css";

export default function AboutPage() {
  const teamMembers = [
    {
      _id: "a",
      name: "Alex Johnson",
      handle: "alexdev",
      avatar: "/herdoy.jpg",
      bio: "Frontend developer | React enthusiast | Building beautiful UIs with Tailwind and shadcn/ui",
      followers: 1243,
      following: 542,
      posts: 86,
    },
    {
      _id: "b",
      name: "Alex Johnson",
      handle: "alexdev",
      avatar: "/herdoy.jpg",
      bio: "Frontend developer | React enthusiast | Building beautiful UIs with Tailwind and shadcn/ui",
      followers: 1243,
      following: 542,
      posts: 86,
    },
    {
      _id: "c",
      name: "Alex Johnson",
      handle: "alexdev",
      avatar: "/herdoy.jpg",
      bio: "Frontend developer | React enthusiast | Building beautiful UIs with Tailwind and shadcn/ui",
      followers: 1243,
      following: 542,
      posts: 86,
    },
    {
      _id: "d",
      name: "Alex Johnson",
      handle: "alexdev",
      avatar: "/herdoy.jpg",
      bio: "Frontend developer | React enthusiast | Building beautiful UIs with Tailwind and shadcn/ui",
      followers: 1243,
      following: 542,
      posts: 86,
    },
  ];

  const stats = [
    { value: "10M+", label: "Happy Customers" },
    { value: "100+", label: "Brand Partners" },
    { value: "24/7", label: "Customer Support" },
    { value: "5★", label: "Average Rating" },
  ];

  return (
    <>
      <Navbar />
      <Container className="px-4 py-12">
        <section className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Our Story
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Redefining E-commerce Excellence
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Founded in 2015, we&apos;ve grown from a small startup to a leading
            e-commerce platform by focusing on quality, customer experience, and
            innovative technology.
          </p>
        </section>

        <section className="mb-16 shadow-lg border border-gray-100 p-6 rounded-3xl">
          <Grid columns={{ initial: "1", md: "2" }} gap="6">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                To provide an unparalleled shopping experience by combining
                cutting-edge technology with human-centered design and
                exceptional customer service.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe in ethical sourcing, sustainable practices, and
                building long-term relationships with both customers and
                suppliers.
              </p>
              <Button variant="outline" className="mt-6">
                Learn About Our Values
              </Button>
            </div>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
                <span className="text-lg font-medium">Company Video</span>
              </div>
            </div>
          </Grid>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((stat, index) => (
              <Card key={index} className="py-6">
                <CardContent>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Container>

      <section className="bg-gray-100 py-16 px-4">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <ProfileCard key={member._id} user={member} />
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              Join Our Growing Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
              Whether you&apos;re a customer, partner, or potential team member,
              we&apos;d love to connect with you.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>Shop Now</Button>
              <Button variant="outline">Contact Us</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
