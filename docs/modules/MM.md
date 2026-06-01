# SAP MM: Materials Management Module

This document provides a comprehensive breakdown of the **SAP MM (Materials Management)** module, which handles the procurement and inventory functions of an enterprise in SAP ECC.

---

### Module Overview
SAP MM manages materials from initial procurement planning to warehouse receipt and final invoice verification. Its primary business objective is to ensure that materials, services, and inventory are managed efficiently with minimal inventory costs, zero stock-outs, and streamlined vendor interactions.

---

### Key Functions
* **Purchasing (MM-PUR):** Managing purchase requisitions, purchase orders, RFQs, outline agreements, and vendor contracts.
* **Inventory Management (MM-IM):** Tracking stock movements, goods receipts, goods issues, physical stock audits, and transfer postings.
* **Invoice Verification (MM-IV):** Executing three-way matching (comparing Purchase Order vs. Goods Receipt quantity/price vs. Vendor Invoice details) to approve payments.
* **Valuation & Account Determination (MM-VAL):** Automatically mapping material movements to general ledger accounts based on pricing and valuation rules.

---

### Important Master Data
* **Material Master (T-Codes `MM01`/`MM02`/`MM03`):** Contains description, units of measure, material group, MRP settings, and accounting valuation data.
* **Vendor Master (T-Codes `XK01`/`XK02`/`XK03`):** Details supplier addresses, payment terms, purchasing group assignments, and bank information.
* **Purchase Info Record (PIR - T-Codes `ME11`/`ME12`):** Links a material to a specific vendor, storing default pricing, tolerances, and delivery times.
* **Source List (T-Code `ME01`):** Specifies which vendors are approved (or blocked) to supply a material during a specific timeframe.

---

### Common Transactions (T-Codes) & Tables

#### Core Transaction Codes
| T-Code | Description | Purpose |
| :--- | :--- | :--- |
| **MM01 / MM02 / MM03** | Material Master | Create / Change / Display Material Records |
| **ME51N / ME52N / ME53N** | Purchase Requisition | Create / Change / Display PR |
| **ME21N / ME22N / ME23N** | Purchase Order | Create / Change / Display PO |
| **MIGO** | Goods Movement | Execute Goods Receipt, Goods Issue, Transfer Posting |
| **MIRO** | Enter Inbound Invoice | Post vendor invoices and execute 3-way match |
| **MMBE** | Stock Overview | View real-time stock levels across Plants & Storage Locations |
| **MB51** | Material Doc List | Run reports on historical material stock movements |

#### Key Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **MARA** | General Material Data | Master |
| **MARC** | Plant Data for Material | Master |
| **MARD** | Storage Location Data | Master |
| **LFA1** | Vendor Master (General Details) | Master |
| **EKKO** | Purchasing Document Header (PO Header) | Transaction |
| **EKPO** | Purchasing Document Item (PO Lines) | Transaction |
| **MSEG** | Document Segment: Material (Stock updates) | Transaction |
| **MKPF** | Header: Material Document | Transaction |

---

### Business Processes
The core business cycle in MM is the **Procure-to-Pay (P2P)** flow:
1. **Requisitioning (`ME51N`):** An internal department requests materials.
2. **Sourcing (`ME41` / `ME01`):** Purchasing negotiates with vendors or references source lists.
3. **Ordering (`ME21N`):** A legally binding Purchase Order is created and sent to the vendor.
4. **Receiving (`MIGO`):** Warehouse workers post a Goods Receipt when goods arrive (Debit Stock, Credit GR/IR clearing).
5. **Invoicing (`MIRO`):** AP accountant posts the vendor invoice after checking the 3-way match (Debit GR/IR clearing, Credit Vendor AP).

---

### Integration with Other Modules
* **FI (Financial Accounting):** Integrates via **Automatic Account Determination (`OBYC`)**. Stock updates post financial documents to G/L accounts.
* **CO (Controlling):** Material issues to production charge expenses directly to Cost Centers or Production Orders.
* **PP (Production Planning):** Material Requirements Planning (MRP) runs in PP and automatically generates Purchase Requisitions in MM when raw material stock levels run low.
* **SD (Sales and Distribution):** Intercompany stock transport orders link SD deliveries with MM stock receipts.

---

### Real Industry Examples
* **Scenario:** A car manufacturing plant needs steel. The MRP run creates a PR for 50 tons of steel. The buyer converts it to a PO. When the steel truck arrives at the warehouse, a clerk uses `MIGO` to post a goods receipt, placing the steel in raw inventory. This triggers a debit to the inventory account and a credit to the GR/IR account.

---

### Interview Questions

#### Q1: What is the purpose of the GR/IR Clearing account?
**Answer:** The GR/IR (Goods Receipt / Invoice Receipt) is a temporary clearing account that acts as a bridge. When a Goods Receipt is posted before the invoice is received, the stock value increases, and the offset is credited to GR/IR. When the invoice arrives, the invoice is debited to GR/IR and credited to the vendor. By the end of the process, the GR/IR balance for that PO returns to zero.

#### Q2: How does the system determine the G/L account during a Goods Receipt?
**Answer:** Through **Automatic Account Determination** (T-Code `OBYC`). The system reads the Chart of Accounts, the Valuation Grouping Code of the plant, the Transaction/Event Key (e.g., `BSX` for inventory), and the Valuation Class from the Material Master's Accounting view. Based on this, it finds the configured G/L account.
