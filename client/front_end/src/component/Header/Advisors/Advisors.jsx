import "./AdvisorsSection.css";
const advisors = [
  {
    name: "Muneer Bakdounsi",
    title: "Agricultural engineer",
    phone: "+963986004226",
    email: "muneer@sy.com",
    image:'/Advisors/p1.jpg',
  },
  {
    name: "Hamza Alhallak",
    title: "Legal advisor",
    phone: "+963956687214",
    email: "hamza@sy.com",
    image: '/Advisors/p2.jpg',
  },
  {
    name: "Ammar Attar",
    title: "Financial advisor",
    phone: "+963992057487",
    email: "ammar@sy.com",
    image: '/Advisors/p3.jpg',
  },
  {
    name: "Abd Alghani Habra",
    title: "Climate expert",
    phone: "+963944015895",
    email: "ghani@sy.com",
    image: '/Advisors/p4.jpg',
  },
];

export default function AdvisorsSection() {

  return (
    <section className="advisors-section">
      <p className="section-title">
      <img src='/lands/icon.png' style={{width: "20px"
                     , height: "20px" , margin: "auto 4px"}}/>
          <em style={{margin:"25px auto"}}>This website gives you lands for investment in agricultural way. Here you see some of our lands</em>
      <img src='/lands/icon.png' style={{width: "20px"
                     , height: "20px" , margin: "auto  6px",marginBottom: "-4px"}}/>
      </p>
      <h2>Advisors</h2>
      <div className="advisors-grid">
        {advisors.map((advisor, index) => (
          <div key={index} className="advisor-card">
                <img src={advisor.image} alt={advisor.name} className="advisor-image" />
                <div className="advisor-content">
                  <h3 className="advisor-name">{advisor.name}</h3>
                  <p className="advisor-title">{advisor.title}</p>
                  <div style={{display:"flex",justifyContent: "center"}}>
                  <img src="../public/lands/phone_icon.png" className="phone_icon"/> <a className="advisor-phone">{advisor.phone}</a>
                  </div>
                  <div style={{display:"flex",justifyContent: "center"}}>
                  <img src="/lands/sms.png" className="phone_icon"/>
                  <a className="advisor-email">{advisor.email}</a>
                  </div>
                
                </div>
          </div>
        ))}
      </div>
    </section>
  );
}