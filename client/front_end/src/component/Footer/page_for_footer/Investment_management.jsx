import './pages.css';
import Header from "../../Header/Header";

export default function Investment_management() {
  return (
   <>
   <Header/>
   <div style={{paddingTop: "60px"}}>
   <h1 className="text-3xl font-bold mb-4">💰 Investment Management</h1>
      <p>
        We help you create personalized investment strategies to achieve your
        financial goals. Our services include:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>Real estate investment analysis.</li>
        <li>Feasibility studies and market research.</li>
        <li>Portfolio management and optimization.</li>
      </ul>
   </div>
   
   </>
  );
}