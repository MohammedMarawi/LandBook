import './pages.css';
import Header from "../../Header/Header";

export default function Property_consulting() {
  return (
   <>
   <Header/>
    <h1 className="text-3xl font-bold mb-4" style={{paddingTop: "60px"}}>🏠 Property Consulting</h1>
      <p className="mb-4">
        Our Property Consulting services are designed to help clients make
        informed decisions when buying, selling, or renting real estate. We
        provide professional advice, market analysis, and customized strategies
        to ensure that every investment is both profitable and secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🔍 Market Research & Analysis</h2>
      <p className="mb-4">
        We conduct in-depth market research to provide insights into current
        property values, rental trends, and potential future growth. Our team
        evaluates economic indicators, neighborhood development, and demand
        cycles to guide your decision-making.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📑 Investment Strategy</h2>
      <p className="mb-4">
        Every investor has unique goals. Whether you are seeking long-term
        capital growth, short-term returns, or passive rental income, we design
        tailored strategies to maximize your ROI and reduce risk.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">⚖️ Legal & Documentation Support</h2>
      <p className="mb-4">
        Navigating property laws and regulations can be complex. Our consultants
        assist with legal documentation, title verification, and compliance with
        local property regulations to protect your rights and interests.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🤝 Personalized Consulting</h2>
      <p className="mb-4">
        We believe in personalized service. Our team works closely with each
        client to understand their needs and provide step-by-step guidance
        throughout the property transaction process.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🌍 Who We Serve</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>First-time homebuyers seeking expert guidance.</li>
        <li>Investors looking for profitable property opportunities.</li>
        <li>Businesses in need of commercial real estate solutions.</li>
        <li>Property owners who want to increase the value of their assets.</li>
      </ul>

      <p className="mt-6">
        With our Property Consulting services, you gain access to professional
        insights and strategies that empower you to make the best decisions in
        today’s dynamic real estate market.
      </p>
   
   </>
  );
}