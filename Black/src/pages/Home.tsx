import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Welcome to AI Hackathon Tracker
          </h1>
          <p className="text-xl text-muted-foreground">
            Your central hub for managing hackathon projects and team collaborations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">1. Register for Hackathons</h3>
                <p className="text-sm text-muted-foreground">
                  Use the Dashboard to register for new hackathons and track your progress
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">2. Manage Your Team</h3>
                <p className="text-sm text-muted-foreground">
                  Add team members and track collaboration across multiple projects
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">3. Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your hackathon phases from idea to completion
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Hackathons</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Projects</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Team Members</span>
                  <span className="font-semibold">7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;