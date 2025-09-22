import './pages.css';
import Header from "../../Header/Header";

export default function Terms_of_service() {
  return (
   <>
   <Header/>
      <h1 className="text-3xl font-bold mb-4" style={{paddingTop: "60px"}}>📜 Terms of Service</h1>
      <p>
        Welcome to our website. By using our services, you agree to comply with
        the following terms:
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Permitted Use</h2>
      <p>
        You are allowed to use this website only for legal and personal purposes.
        It is strictly prohibited to:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>Use the website for defamation, abuse, or spreading misleading information.</li>
        <li>Resell or commercially exploit any content without prior written consent.</li>
        <li>Attempt to hack, disrupt, or disable the system.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">2. Modifications</h2>
      <p>
        We reserve the right to update these terms at any time. Continued use of
        the website after modifications constitutes acceptance of the new terms.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Liability</h2>
      <p>
        We are not liable for any direct or indirect losses resulting from the use
        of this website, including service interruptions or errors.
      </p>
   
   </>
  );
}