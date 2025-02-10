
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ScheduleMeetingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduleMeetingForm = ({ open, onOpenChange }: ScheduleMeetingFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Method 1: Direct fetch with no-cors mode
      const response = await fetch(
        'https://kabeeryosaf.app.n8n.cloud/webhook/1cc6c5d0-72a5-4fbd-93fd-daf5d4c08ae1',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        }
      );

      // Since no-cors mode returns an opaque response, we can't check status
      // We'll assume it worked if we got here without an error
      toast.success("Meeting request submitted!");
      onOpenChange(false);
      setFormData({
        name: "",
        email: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      
      // Method 2: Try with XMLHttpRequest as fallback
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://kabeeryosaf.app.n8n.cloud/webhook/1cc6c5d0-72a5-4fbd-93fd-daf5d4c08ae1', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          toast.success("Meeting request submitted successfully!");
          onOpenChange(false);
          setFormData({
            name: "",
            email: "",
            date: "",
            time: "",
            notes: "",
          });
        } else {
          toast.error("Failed to submit form. Please try again.");
        }
      };
      
      xhr.onerror = function() {
        toast.error("Failed to submit form. Please try again.");
      };
      
      xhr.send(JSON.stringify(formData));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
          <DialogDescription>
            Fill out the form below to schedule a consultation with our coaching team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any specific topics you'd like to discuss?"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetingForm;
