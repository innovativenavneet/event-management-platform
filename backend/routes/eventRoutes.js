import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Event from "../models/Event.js";

const router = express.Router();

// ✅ Create an Event
router.post("/", protect, async (req, res) => {
  try {
    const { name, description, date, location, category } = req.body;

    const newEvent = new Event({
      name,
      description,
      date,
      location,
      category,
      createdBy: req.user,
      attendees: [],
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Get a Single Event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Update an Event (Only Event Creator)
router.put("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user)
      return res.status(403).json({ message: "Unauthorized to update this event" });

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Delete an Event (Only Event Creator)
router.delete("/:id", protect, async (req, res) => {
  try {
    console.log("User ID:", req.user); // Debugging
    console.log("Event ID:", req.params.id); // Debugging

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    console.log("Event Created By:", event.createdBy.toString()); // Debugging

    if (event.createdBy.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this event" });
    }

    await event.deleteOne(); // Alternative to remove()
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error); // Debugging
    res.status(500).json({ message: "Server error", error });
  }
});


// ✅ Join an Event
router.post("/:id/join", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(req.user)) {
      return res.status(400).json({ message: "You are already attending this event" });
    }

    event.attendees.push(req.user);
    await event.save();
    res.status(200).json({ message: "Joined the event successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Leave an Event
router.post("/:id/leave", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.attendees = event.attendees.filter((attendee) => attendee.toString() !== req.user);
    await event.save();
    res.status(200).json({ message: "Left the event successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
