import LandingPageCard from "./LandingPageCard";
import Finance from "../assets/finance.jpg";
import Distribution1 from "../assets/distribution1.jpg";
import Dustribution2 from "../assets/distribution2.jpg";
import Distribution3 from "../assets/distribution3.jpg";
import Distribution4 from "../assets/5006144.jpg";
import Project from "../assets/6161625.jpg";
import Audit from "../assets/audit.jpg";
import Billing from "../assets/billing.jpg";
import Transmission from "../assets/transmission.jpg";

const LandingPageCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      <LandingPageCard topic="Distribution 1" image={Distribution1} />
      <LandingPageCard topic="Distribution 2" image={Dustribution2} />
      <LandingPageCard topic="Dustribution 3" image={Distribution3} />
      <LandingPageCard topic="Distribution 4" image={Distribution4} />
      <LandingPageCard topic="Finance" image={Finance} />
      <LandingPageCard topic="Transmission" image={Transmission} />
      <LandingPageCard topic="Project" image={Project} />
      <LandingPageCard topic="CS Division" image={Finance} />
      <LandingPageCard topic="Generation" image={Audit} />
      <LandingPageCard topic="Asset Management" image={Billing} />
    </div>
  );
};

export default LandingPageCards;
