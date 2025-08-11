import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface HackathonFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: HackathonFormData) => void;
  initialData?: HackathonFormData;
}

interface HackathonFormData {
  name: string;
  url: string;
  team_size: number;
  team_members: string;
  github_url: string;
  phase: string;
}

const HackathonForm = ({ isOpen, onClose, onSubmit, initialData }: HackathonFormProps) => {
  const [formData, setFormData] = useState<HackathonFormData>(
    initialData || {
      name: "",
      url: "",
      team_size: 1,
      team_members: "",
      github_url: "",
      phase: "Idea Phase"
    }
  );
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: "Success",
      description: "Hackathon registered successfully! Connect to your backend to save.",
    });
    onClose();
  };

  const handleInputChange = (field: keyof HackathonFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const phases = [
    "Idea Phase",
    "In Progress",
    "Submitted",
    "Completed",
    "Failed"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Hackathon" : "Register New Hackathon"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Hackathon Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter hackathon name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Hackathon URL *</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange("url", e.target.value)}
              placeholder="https://hackathon-website.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team_size">Team Size</Label>
            <Input
              id="team_size"
              type="number"
              min="1"
              max="10"
              value={formData.team_size}
              onChange={(e) => handleInputChange("team_size", parseInt(e.target.value) || 1)}
              placeholder="Number of team members"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team_members">Team Member Names</Label>
            <Input
              id="team_members"
              value={formData.team_members}
              onChange={(e) => handleInputChange("team_members", e.target.value)}
              placeholder="John Doe, Jane Smith, Bob Johnson"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input
              id="github_url"
              type="url"
              value={formData.github_url}
              onChange={(e) => handleInputChange("github_url", e.target.value)}
              placeholder="https://github.com/username/project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phase">Phase of Development</Label>
            <Select value={formData.phase} onValueChange={(value) => handleInputChange("phase", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select phase" />
              </SelectTrigger>
              <SelectContent>
                {phases.map((phase) => (
                  <SelectItem key={phase} value={phase}>
                    {phase}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update" : "Register"} Hackathon
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HackathonForm;