const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper to read the mock database
const getDatabase = () => {
  const dbPath = path.join(__dirname, 'database', 'sap_db.json');
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock database:', error);
    return { tcodes: [], tables: [], dumps: {} };
  }
};

// API: Get quick summary stats
app.get('/api/summary', (req, res) => {
  const db = getDatabase();
  res.json({
    totalTcodes: db.tcodes.length,
    totalTables: db.tables.length,
    availableDumps: Object.keys(db.dumps)
  });
});

// API: Search T-Codes and Tables
app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  const db = getDatabase();
  
  if (!query) {
    return res.json({ tcodes: db.tcodes, tables: db.tables });
  }

  const filteredTcodes = db.tcodes.filter(t => 
    t.code.toLowerCase().includes(query) ||
    t.name.toLowerCase().includes(query) ||
    t.module.toLowerCase().includes(query) ||
    t.description.toLowerCase().includes(query)
  );

  const filteredTables = db.tables.filter(tab => 
    tab.name.toLowerCase().includes(query) ||
    tab.module.toLowerCase().includes(query) ||
    tab.description.toLowerCase().includes(query) ||
    tab.fields.some(f => f.toLowerCase().includes(query))
  );

  res.json({
    tcodes: filteredTcodes,
    tables: filteredTables
  });
});

// API: Diagnose ABAP short dump
app.post('/api/diagnose', (req, res) => {
  const { errorCode } = req.body;
  const db = getDatabase();
  
  if (!errorCode) {
    return res.status(400).json({ error: 'errorCode is required' });
  }
  
  const dumpKey = errorCode.trim().toUpperCase();
  const diagnosis = db.dumps[dumpKey];
  
  if (diagnosis) {
    res.json({ found: true, details: diagnosis });
  } else {
    res.json({
      found: false,
      message: `Error code '${errorCode}' not found in basis database. Try 'TIME_OUT', 'ITAB_DUPLICATE_KEY', 'GETWA_NOT_ASSIGNED', or 'SQL_ARRAY_INSERT_DUPREC'.`
    });
  }
});

// Serve frontend SPA index for any unrecognized routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`SAP ECC Portal Backend running at http://localhost:${PORT}`);
});
