const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3005;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'demo-public')));

// Mock data storage
let contacts = [];
let contactId = 1;

const practiceAreas = [
  'Wills and Trust',
  'Estate Planning', 
  'Immigration',
  'Credit Repair',
  'Mortgages',
  'Personal Injury',
  'Real Estate'
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo-public', 'index.html'));
});

app.get('/api/immigrantrus/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    contacts: contacts.length,
    service: 'ImmigrantRus CRM Demo'
  });
});

app.get('/api/immigrantrus/practice-areas', (req, res) => {
  res.json({
    success: true,
    areas: practiceAreas,
    total: practiceAreas.length
  });
});

app.get('/api/immigrantrus/practice-areas/stats', (req, res) => {
  res.json({
    total: practiceAreas.length,
    active: practiceAreas.length,
    areas: practiceAreas.join(', ')
  });
});

app.get('/api/immigrantrus/contacts', (req, res) => {
  const { practiceArea } = req.query;
  
  let filteredContacts = contacts;
  if (practiceArea) {
    filteredContacts = contacts.filter(contact => 
      contact.practiceAreas.includes(practiceArea)
    );
  }
  
  res.json({
    success: true,
    total: filteredContacts.length,
    contacts: filteredContacts
  });
});

app.post('/api/immigrantrus/contacts', (req, res) => {
  const { email, phone, notes, practiceAreas } = req.body;
  
  // Check for duplicate email
  const existingContact = contacts.find(c => c.email === email);
  if (existingContact) {
    return res.status(400).json({
      success: false,
      error: 'Contact with this email already exists'
    });
  }
  
  const newContact = {
    id: String(contactId++),
    email,
    phone: phone || '',
    notes: notes || '',
    practiceAreas: practiceAreas || [],
    createdAt: new Date().toISOString(),
    getsnugSync: true
  };
  
  contacts.push(newContact);
  
  res.json({
    success: true,
    contact: newContact,
    message: 'Contact created successfully and synced to GetSnug CRM'
  });
});

app.post('/api/immigrantrus/webhook/contact', (req, res) => {
  const { email, practiceAreas, source } = req.body;
  
  const newContact = {
    id: String(contactId++),
    email,
    practiceAreas: practiceAreas || ['webhook'],
    source: source || 'website',
    createdAt: new Date().toISOString(),
    getsnugSync: true
  };
  
  contacts.push(newContact);
  
  res.json({
    success: true,
    contact: newContact,
    message: 'Webhook contact created and synced to both CRMs'
  });
});

app.delete('/api/immigrantrus/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Contact not found'
    });
  }
  
  contacts.splice(contactIndex, 1);
  
  res.json({
    success: true,
    message: 'Contact deleted successfully'
  });
});

app.listen(port, () => {
  console.log(`🚀 ImmigrantRus CRM Demo Server running at http://localhost:${port}`);
  console.log(`📊 API endpoints available at http://localhost:${port}/api/immigrantrus/`);
  console.log(`🎯 Practice Areas: ${practiceAreas.length} configured`);
  console.log(`📝 Ready to manage contacts with dual CRM sync`);
});
