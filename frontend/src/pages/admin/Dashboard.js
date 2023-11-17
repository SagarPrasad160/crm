import Cards from "../../components/Cards";

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
      <Cards cards={cardsData} />
    </div>
  );
}

export default Dashboard;
