const API_BASE = window.location.origin;

// Tab Navigation Logic
const navButtons = document.querySelectorAll('.nav-btn');
const tabViews = document.querySelectorAll('.tab-view');

function switchTab(tabId, searchFilter = '') {
  // Update nav buttons
  navButtons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update view panel
  tabViews.forEach(view => {
    if (view.id === `tab-${tabId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  if (tabId === 'search') {
    const searchInput = document.getElementById('search-input');
    if (searchFilter) {
      searchInput.value = searchFilter;
    }
    triggerSearch();
  }
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.getAttribute('data-tab'));
  });
});

// Stats Loader
async function loadStats() {
  try {
    const response = await fetch(`${API_BASE}/api/summary`);
    const data = await response.json();
    document.getElementById('stat-tcodes').innerText = data.totalTcodes;
    document.getElementById('stat-tables').innerText = data.totalTables;
    document.getElementById('stat-dumps').innerText = data.availableDumps.length;
  } catch (error) {
    console.error('Error fetching statistics:', error);
  }
}

// Search Functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const tcodeResults = document.getElementById('tcode-results');
const tableResults = document.getElementById('table-results');

async function triggerSearch() {
  const query = searchInput.value.trim();
  try {
    const response = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    // Render T-Codes
    tcodeResults.innerHTML = '';
    if (data.tcodes.length === 0) {
      tcodeResults.innerHTML = '<tr><td colspan="3" class="system-line">No transaction codes found matching query.</td></tr>';
    } else {
      data.tcodes.forEach(t => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><code>${t.code}</code></td>
          <td><span class="step-info"><code>${t.module}</code></span></td>
          <td>
            <strong>${t.name}</strong><br>
            <span class="system-line" style="font-size:0.85rem">${t.description}</span>
          </td>
        `;
        tcodeResults.appendChild(row);
      });
    }

    // Render Tables
    tableResults.innerHTML = '';
    if (data.tables.length === 0) {
      tableResults.innerHTML = '<tr><td colspan="3" class="system-line">No database tables found matching query.</td></tr>';
    } else {
      data.tables.forEach(tab => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><code>${tab.name}</code></td>
          <td><span class="step-info"><code>${tab.module}</code></span></td>
          <td>
            <strong>${tab.description}</strong><br>
            <span style="font-size:0.8rem; color: #a78bfa;">Fields: ${tab.fields.join(', ')}</span>
          </td>
        `;
        tableResults.appendChild(row);
      });
    }

  } catch (error) {
    console.error('Search API failure:', error);
  }
}

searchBtn.addEventListener('click', triggerSearch);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    triggerSearch();
  }
});

// ABAP Short Dump Sandbox Simulator
const runDumpBtn = document.getElementById('run-dump-btn');
const dumpSelect = document.getElementById('dump-select');
const terminalOutput = document.getElementById('terminal-output');

runDumpBtn.addEventListener('click', async () => {
  const errorCode = dumpSelect.value;
  terminalOutput.innerHTML = `<p class="system-line">> Requesting diagnostic profile for dump code '${errorCode}' from backend server...</p>`;
  
  try {
    const response = await fetch(`${API_BASE}/api/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ errorCode })
    });
    const data = await response.json();
    
    if (data.found) {
      const details = data.details;
      terminalOutput.innerHTML = `
        <h4>SYSTEM CRASH DUMP: ${details.title}</h4>
        <p class="system-line">Timestamp: ${new Date().toISOString()} | Client: 100 | Program: SAPL_CORE_RUN</p>
        <br>
        <p style="color: #f87171;"><strong>Primary Cause of Failure:</strong></p>
        <p style="margin-left: 10px; margin-bottom: 12px; color: #fca5a5;">${details.cause}</p>
        
        <p style="color: var(--accent-cyan);"><strong>Basis Administrator Recommended Action Plan:</strong></p>
        <ul>
          ${details.steps.map(step => `<li>${step}</li>`).join('')}
        </ul>
        <br>
        <p class="system-line">> Diagnostics complete. Lock database restored. System stable.</p>
      `;
    } else {
      terminalOutput.innerHTML = `<p style="color: #ef4444;">> Backend Error: ${data.message}</p>`;
    }
  } catch (error) {
    terminalOutput.innerHTML = `<p style="color: #ef4444;">> API Connection Lost. Ensure local Node server is running on Port 5000.</p>`;
  }
});

// Business Process Flow Data
const processesData = {
  p2p: {
    title: "Procure to Pay (P2P) Flow",
    overview: "P2P integrates materials logistics with core financial ledger mapping, ensuring materials are acquired from authorized vendors and paid out upon validation.",
    steps: [
      { num: "01", name: "Create Purchase Requisition", tcode: "ME51N", desc: "Internal department request outlining material volume requirements." },
      { num: "02", name: "Generate Purchase Order", tcode: "ME21N", desc: "Legally binding procurement contract sent to Vendor." },
      { num: "03", name: "Goods Receipt", tcode: "MIGO", desc: "Physical delivery processed. Stock is incremented, and Debit Stock / Credit GR/IR entries occur." },
      { num: "04", name: "Invoice Verification", tcode: "MIRO", desc: "Vendor invoice checked against PO pricing and Goods Receipt quantity (3-Way Match)." },
      { num: "05", name: "Vendor Outgoing Payment", tcode: "F-53", desc: "Account balances cleared via Bank wire transfer in Financials." }
    ]
  },
  o2c: {
    title: "Order to Cash (O2C) Flow",
    overview: "O2C encompasses all processes related to selling products to customers, distributing items via deliveries, and accounting for revenue gains.",
    steps: [
      { num: "01", name: "Enter Sales Order", tcode: "VA01", desc: "Agreed sales items locked in and Stock Availability (ATP) verified." },
      { num: "02", name: "Outbound Delivery", tcode: "VL01N", desc: "Shipping document prepared to coordinate picking actions." },
      { num: "03", name: "Post Goods Issue (PGI)", tcode: "VL02N", desc: "Ownership transfer: stock leaves the yard. Debit COGS / Credit Stock." },
      { num: "04", name: "Invoice Customer", tcode: "VF01", desc: "Billing documents generated and Accounts Receivable debited." },
      { num: "05", name: "Receive Payment", tcode: "F-28", desc: "Clear customer open items against bank deposits." }
    ]
  },
  r2r: {
    title: "Record to Report (R2R) Flow",
    overview: "R2R encompasses general ledger management, month-end ledger closings, depreciation tasks, and statutory audit reporting.",
    steps: [
      { num: "01", name: "Enter G/L Journals", tcode: "FB50", desc: "Manual balance entries registered on specific expense/asset lines." },
      { num: "02", name: "Asset Depreciation Run", tcode: "AFAB", desc: "Calculated depreciation calculated and expensed monthly." },
      { num: "03", name: "Foreign Currency Revaluation", tcode: "FAGL_FC_VAL", desc: "Open invoices revalued to foreign exchange rates." },
      { num: "04", name: "Close Posting Periods", tcode: "OB52", desc: "Block operations entries from altering preceding periods." },
      { num: "05", name: "Consolidated Balance Statements", tcode: "F.01", desc: "Construct primary Trial Balances, P&L, and Balance Sheet charts." }
    ]
  },
  plan: {
    title: "Plan to Produce Flow",
    overview: "Bridges sales planning with physical shop floor operations, evaluating Bill of Materials components and releasing scheduling order cards.",
    steps: [
      { num: "01", name: "Planned Independent Requirements", tcode: "MD61", desc: "Load predicted demand quotas or sales forecasts." },
      { num: "02", name: "Execute MRP Run", tcode: "MD02", desc: "Net requirement calculations run. Requisitions generated for shortages." },
      { num: "03", name: "Confirm Production Order", tcode: "CO01", desc: "Resource scheduling and machine allocations confirmed." },
      { num: "04", name: "Goods Issue Components", tcode: "MIGO (261)", desc: "Raw elements pulled from stock and assigned to the production order." },
      { num: "05", name: "Finished Goods Receipt", tcode: "MIGO (101)", desc: "Completed assembly checked into warehouse. Factory output posted." }
    ]
  }
};

const processContent = document.getElementById('process-content');
const processButtons = document.querySelectorAll('.process-btn');

function renderProcess(procKey) {
  const p = processesData[procKey];
  if (!p) return;
  
  processContent.innerHTML = `
    <h2>${p.title}</h2>
    <p class="overview">${p.overview}</p>
    
    <div class="process-step-list">
      ${p.steps.map(step => `
        <div class="process-step">
          <div class="step-num">${step.num}</div>
          <div class="step-info">
            <h4>${step.name} - <code>${step.tcode}</code></h4>
            <p>${step.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

processButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    processButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProcess(btn.getAttribute('data-process'));
  });
});

// Initial Setup Call
window.addEventListener('DOMContentLoaded', () => {
  loadStats();
  triggerSearch(); // Prefill search results
  renderProcess('p2p'); // Prefill P2P details
});
