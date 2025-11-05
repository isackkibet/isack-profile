import express from 'express';
import Contact from '../models/Contact.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all contact messages (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark as read (protected)
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete contact message (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
