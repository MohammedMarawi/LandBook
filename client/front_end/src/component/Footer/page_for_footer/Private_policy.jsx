import './pages.css';
import Header from "../../Header/Header";

export default function Private_policy() {
  return (
   <>
   <Header/>
     <h1 className="text-3xl font-bold mb-4" style={{paddingTop: "60px"}}>🔒 Privacy Policy</h1>
      <p>
        We respect your privacy and are committed to protecting your personal
        data. The information we collect is used only for service improvement.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>Personal details such as name, phone number, and email address.</li>
        <li>Usage data such as pages you visit.</li>
        <li>Geolocation data (if you allow it).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">2. Use of Information</h2>
      <p>
        Your data is used to provide services, improve user experience, and
        communicate with you when necessary.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Data Protection</h2>
      <p>
        We take security measures to protect your data from unauthorized access.
        We do not share your data with third parties without your consent, unless
        required by law.
      </p>
   </>
  );
}