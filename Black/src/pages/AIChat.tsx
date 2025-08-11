import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageSquare, Zap } from "lucide-react";

const AIChat = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">AI Chat Assistant</h1>
          <p className="text-xl text-muted-foreground">
            Coming soon - AI-powered hackathon guidance and team collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <Bot className="w-12 h-12 mx-auto text-primary" />
              <CardTitle>Project Assistant</CardTitle>
              <CardDescription>
                Get AI-powered suggestions for your hackathon projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Receive personalized recommendations for technologies, frameworks, and project structure
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-primary" />
              <CardTitle>Team Coordination</CardTitle>
              <CardDescription>
                Streamline communication with your hackathon team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                AI-assisted task distribution and progress tracking for better team collaboration
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 mx-auto text-primary" />
              <CardTitle>Code Review</CardTitle>
              <CardDescription>
                Automated code analysis and improvement suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Get instant feedback on your code quality and performance optimizations
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Placeholder Features</CardTitle>
            <CardDescription>
              These AI features will be available in future updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">Smart Project Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    AI will analyze your skills and suggest relevant hackathons
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">Automated Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate project documentation and README files automatically
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">Performance Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your hackathon performance and receive personalized insights
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;