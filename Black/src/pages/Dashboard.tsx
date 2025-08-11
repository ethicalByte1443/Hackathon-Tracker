import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import HackathonForm from "@/components/HackathonForm";

// Mock data - replace with API calls to your backend
const mockHackathons = [
  {
    id: 1,
    name: "AI Innovation Challenge",
    url: "https://example.com/hackathon1",
    team_size: 4,
    team_members: ["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown"],
    github_url: "https://github.com/team/project1",
    phase: "In Progress",
    status: "Joined"
  },
  {
    id: 2,
    name: "Future Tech Hackathon",
    url: "https://example.com/hackathon2",
    team_size: 3,
    team_members: ["John Doe", "Jane Smith", "Charlie Wilson"],
    github_url: "https://github.com/team/project2",
    phase: "Completed",
    status: "Completed"
  }
];

const Dashboard = () => {
  const [hackathons] = useState(mockHackathons);
  const [showForm, setShowForm] = useState(false);

  const stats = {
    joined: hackathons.filter(h => h.status === "Joined").length,
    completed: hackathons.filter(h => h.status === "Completed").length,
    upcoming: hackathons.filter(h => h.status === "Upcoming").length,
    failed: hackathons.filter(h => h.status === "Failed").length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "Joined": return <Clock className="h-4 w-4 text-info" />;
      case "Upcoming": return <Clock className="h-4 w-4 text-warning" />;
      case "Failed": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success text-white";
      case "Joined": return "bg-info text-white";
      case "Upcoming": return "bg-warning text-white";
      case "Failed": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Register New Hackathon
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Joined Hackathons</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{stats.joined}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Hackathons</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Hackathons</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.upcoming}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Hackathons</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.failed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Hackathons List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Hackathons</CardTitle>
        </CardHeader>
        <CardContent>
          {hackathons.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hackathons registered yet. Click "Register New Hackathon" to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {hackathons.map((hackathon) => (
                <div key={hackathon.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{hackathon.name}</h3>
                      {getStatusIcon(hackathon.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Team Size: {hackathon.team_size} | Phase: {hackathon.phase}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Team: {hackathon.team_members.join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(hackathon.status)}>
                      {hackathon.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <HackathonForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            console.log("Hackathon data:", data);
            // TODO: Send to your backend API
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;