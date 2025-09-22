import './pages.css';
import Header from "../../Header/Header";

export default function License() {
  return (
   <>
   <Header/>
    <h1 className="text-3xl font-bold mb-4" style={{paddingTop: "60px"}}>📄 License</h1>
      <p>
        All rights, trademarks, and software associated with this website are
        owned by the company.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Intellectual Property</h2>
      <p>
        All content on this website (text, images, code) is protected under
        copyright and intellectual property laws.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Permitted Use</h2>
      <p>
        You may use the content for personal, non-commercial purposes only. Any
        redistribution or reproduction requires written permission.
      </p>
   </>
  );
}