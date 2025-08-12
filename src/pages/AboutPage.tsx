import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        asChild
        variant="outline" 
        className="mb-6"
      >
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <Card className="bg-card">
        <CardContent className="p-8">
          <h1 className="font-serif text-4xl font-bold text-card-foreground mb-6">
            About FAIRLAW
          </h1>
          
          <div className="prose max-w-none text-card-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              Welcome to <strong>FAIRLAW</strong>, your premier source for the latest and most accurate 
              legal news and analysis. Our mission is to empower legal minds and enrich justice by 
              providing timely updates, insightful opinions, and in-depth case analyses.
            </p>
            
            <p className="leading-relaxed">
              Founded by a team of dedicated legal professionals, we strive to maintain the highest 
              standards of journalism and legal scholarship. We cover a wide range of topics, from 
              landmark Supreme Court judgments to critical legislative changes, ensuring our readers 
              are always well-informed.
            </p>

            <div className="bg-legal-gray-light rounded-lg p-6 my-8">
              <h2 className="text-2xl font-semibold text-card-foreground mb-4">Our Coverage</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                <li>• Constitutional Law</li>
                <li>• Family Law</li>
                <li>• Corporate Law</li>
                <li>• Technology Law</li>
                <li>• Alternative Dispute Resolution</li>
                <li>• Supreme Court Decisions</li>
                <li>• Legislative Updates</li>
                <li>• Case Comments & Analysis</li>
              </ul>
            </div>

            <p className="leading-relaxed">
              At FAIRLAW, we believe that access to legal information should be clear, comprehensive, 
              and accessible to all. Whether you're a practicing lawyer, law student, or someone 
              interested in understanding the legal landscape, our platform serves as your trusted 
              guide through the complex world of Indian jurisprudence.
            </p>

            <p className="leading-relaxed">
              Our team combines decades of legal experience with modern digital journalism practices 
              to deliver content that is both authoritative and engaging. We are committed to 
              maintaining editorial independence and providing balanced perspectives on all legal matters.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;