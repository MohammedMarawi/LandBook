import './pages.css';
import Header from "../../Header/Header";

export default function Property_management() {
  return (
   <>
   <Header/>
    <h1 className="text-3xl font-bold mb-4" style={{paddingTop: "60px"}}>🏢 Property Management</h1>
      <p>
        Our property management services cover everything from tenant relations
        to maintenance, ensuring your property value grows over time.
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>Tenant management and rent collection.</li>
        <li>Regular maintenance and repairs.</li>
        <li>Detailed financial reporting.</li>
      </ul>
   
   </>
  );
}