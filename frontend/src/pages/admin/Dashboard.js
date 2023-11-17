import Cards from "../../components/Cards";
import Accordion from "../../components/Accordion";

// Updated sample data for cards
const cardsData = [
  {
    data: 3500,
    progress: "+15%",
    desc: "Total Users",
  },
  {
    data: 120,
    progress: "-5%",
    desc: "Active Users",
  },
  {
    data: 250,
    progress: "+20%",
    desc: "New Users",
  },
  {
    data: 500,
    progress: "+10%",
    desc: "Registered Users",
  },
  // Add more card objects as needed
];

function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <Cards cards={cardsData} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Accordion />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
