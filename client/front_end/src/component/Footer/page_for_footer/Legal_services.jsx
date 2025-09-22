import Header from "../../Header/Header";
import './pages.css';

export default function Legal_services() {
    return (
      <div>
        <Header/>
        <h1 className="text-3xl font-bold mb-4" style={{paddingTop: "60px"}}>⚖️ Legal Services</h1>
        <p>
          Our legal team provides comprehensive support for your real estate
          transactions, including:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Contract drafting and review.</li>
          <li>Resolving property disputes.</li>
          <li>Ensuring compliance with local laws.</li>
        </ul>
      </div>
    );
  }
  