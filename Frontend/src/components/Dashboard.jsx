import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";
import { Users, Calendar, Clock, CheckCircle } from "lucide-react";
import { AddHackathonModal } from "./ui/AddHackathonModal";

const statusColors = {
  Ideation: "bg-blue-600",
  Development: "bg-yellow-500",
  Testing: "bg-orange-500",
  Submitted: "bg-purple-500",
  Completed: "bg-green-600",
};

export default function Dashboard({ userEmail, username }) {
  const [hackathons, setHackathons] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchHackathons = () => {
    fetch(`http://localhost:5000/api/hackathons?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setHackathons(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (userEmail) {
      fetchHackathons();
    }
  }, [userEmail]);

  const stats = {
    total: hackathons.length,
    completed: hackathons.filter((h) => h.current_phase === "Completed").length,
    inProgress: hackathons.filter((h) => h.current_phase !== "Completed")
      .length,
    upcoming: hackathons.filter((h) => h.current_phase === "Ideation").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white px-8 py-6">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Hii {username}</h1>
        <Button onClick={() => setModalOpen(true)}>+ Add Hackathon</Button>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
      >
        <StatCard
          icon={<Users className="text-blue-400" />}
          label="Total Hackathons"
          value={stats.total}
        />
        <StatCard
          icon={<CheckCircle className="text-green-400" />}
          label="Completed"
          value={stats.completed}
        />
        <StatCard
          icon={<Clock className="text-yellow-400" />}
          label="In Progress"
          value={stats.inProgress}
        />
        <StatCard
          icon={<Calendar className="text-purple-400" />}
          label="Upcoming"
          value={stats.upcoming}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...hackathons]
          .map((hack) => {
            const endDate = new Date(hack.due_date);
            const currentDate = new Date();
            const daysLeft = Math.max(
              0,
              Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24))
            );

            // ✅ If time is up and not already marked Completed
            if (daysLeft === 0 && hack.current_phase !== "Completed") {
              fetch(`http://localhost:5000/api/hackathons/${hack._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ current_phase: "Completed" }),
              })
                .then((res) => {
                  if (res.ok) {
                    // Refresh data after update
                    fetchHackathons();
                  }
                })
                .catch((err) => console.error("Failed to update phase:", err));
            }

            return { ...hack, daysLeft };
          })
          .sort((a, b) => a.daysLeft - b.daysLeft)
          .map((hack, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="bg-gray-800 border-none shadow-xl">
                <CardContent className="space-y-3 p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      {hack.hackathon_name}
                    </h3>
                    <Badge
                      className={`${
                        statusColors[hack.current_phase] || "bg-gray-500"
                      }`}
                    >
                      {hack.current_phase}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300">
                    {hack.hackathon_organiser}
                  </p>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {hack.description}
                  </p>
                  <div>
                    <Progress value={0} className="h-2 bg-gray-700" />
                    <p className="text-xs text-right mt-1 text-gray-400">0%</p>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <p>Start: {new Date(hack.start_date).toDateString()}</p>
                    <p>End: {new Date(hack.due_date).toDateString()}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 pt-2 border-t border-gray-700">
                    <span>
                      <Users className="inline mr-1" size={16} />
                      {hack.team_member_number} team members
                    </span>
                    <span>{hack.phases?.length || 0} phases</span>
                  </div>
                  <div className="text-xs text-right text-pink-400 font-medium">
                    ⏳ {hack.daysLeft} {hack.daysLeft === 1 ? "day" : "days"}{" "}
                    left
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>

      {/* ✅ Add Hackathon Modal with userEmail passed */}
      <AddHackathonModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchHackathons}
        userEmail={userEmail}
      />
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <Card className="bg-gray-800 border-none text-white shadow-md">
      <CardContent className="flex items-center space-x-4 p-5">
        {icon}
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
