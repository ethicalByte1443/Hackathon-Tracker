import { useState } from "react";
import { Modal } from "./modal";
import { Button } from "./button";

export function AddHackathonModal({ isOpen, onClose, userEmail }) {
  const [formData, setFormData] = useState({
    hackathon_name: "",
    hackathon_organiser: "",
    description: "",
    registration_date: "",
    start_date: "",
    due_date: "",
    project_link_git: "",
    current_phase: "",
    team_member_names: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      email: userEmail, // ✅ ADD THIS FIELD
      team_member_number: formData.team_member_names.split(",").length,
      team_member_names: formData.team_member_names
        .split(",")
        .map((name) => name.trim()),
    };

    try {
      const res = await fetch("http://localhost:5000/api/hackathons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Hackathon added successfully!");
        onClose();
      } else {
        const err = await res.json();
        alert(
          "❌ Failed to add hackathon: " + (err.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error connecting to server.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add New Hackathon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="hackathon_name"
            placeholder="Enter hackathon name"
            className="p-2 rounded bg-gray-800 w-full"
            onChange={handleChange}
            required
          />
          <input
            name="hackathon_organiser"
            placeholder="Organization name"
            className="p-2 rounded bg-gray-800 w-full"
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="description"
          placeholder="Describe the hackathon theme and goals"
          className="p-2 rounded bg-gray-800 w-full"
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-3 gap-4">
          <input
            type="date"
            name="registration_date"
            className="p-2 rounded bg-gray-800 w-full"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="start_date"
            className="p-2 rounded bg-gray-800 w-full"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="due_date"
            className="p-2 rounded bg-gray-800 w-full"
            onChange={handleChange}
            required
          />
        </div>
        <input
          name="project_link_git"
          placeholder="https://github.com/..."
          className="p-2 rounded bg-gray-800 w-full"
          onChange={handleChange}
        />
        <select
          name="current_phase"
          className="p-2 rounded bg-gray-800 w-full"
          onChange={handleChange}
          required
        >
          <option value="">Select phase</option>
          <option>Planning</option>
          <option>Analysis</option>
          <option>Design</option>
          <option>Implementation</option>
          <option>Testing</option>
          <option>Maintenance</option>
        </select>
        <input
          name="team_member_names"
          placeholder="Enter names separated by commas"
          className="p-2 rounded bg-gray-800 w-full"
          onChange={handleChange}
        />
        <div className="flex justify-end gap-4">
          <Button type="button" onClick={onClose} className="bg-gray-500">
            Cancel
          </Button>
          <Button type="submit">Create Hackathon</Button>
        </div>
      </form>
    </Modal>
  );
}
