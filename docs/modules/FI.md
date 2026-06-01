# SAP FI: Financial Accounting Module

This document provides a comprehensive breakdown of the **SAP FI (Financial Accounting)** module, which is the core financial reporting ledger of SAP ECC.

---

### Module Overview
The primary objective of the SAP FI module is to capture all transactional data affecting the financial status of an organization and generate legal financial statements. It is designed to satisfy external reporting requirements (for tax authorities, shareholders, auditors, and government regulators) in compliance with international and local accounting standards (like US GAAP, IFRS).

---

### Key Functions
SAP FI is composed of several key sub-modules:
1. **General Ledger (FI-GL):** The core register of all financial postings, supporting Chart of Accounts and Balance Sheet/P&L generation.
2. **Accounts Payable (FI-AP):** Manages vendor records, invoices, outgoing payments, and liabilities.
3. **Accounts Receivable (FI-AR):** Tracks customer invoices, incoming payments, and aging accounts.
4. **Asset Accounting (FI-AA):** Manages the lifecycle of fixed assets, including depreciation runs and acquisitions.
5. **Bank Ledger (FI-BL):** Handles bank statements reconciliation and cash flows.

---

### Important Master Data
* **General Ledger (G/L) Account:** The record where financial transactions are stored. Configured centrally via T-Code `FS00`.
* **Vendor Master Record:** Contains payment terms, payment methods, bank details, and the Accounts Payable reconciliation account.
* **Customer Master Record:** Contains credit limits, payment terms, reconciliation accounts, and dunning procedures.
* **Asset Master Record:** Defines asset description, cost center ownership, capitalization date, and depreciation keys.

---

### Common Transactions (T-Codes) & Tables

#### Core Transaction Codes
| T-Code | Description | Purpose |
| :--- | :--- | :--- |
| **FS00** | G/L Account Centrally | Create and maintain G/L Accounts (Chart of Accounts & Company Code views). |
| **FB50 / F-02**| Post G/L Document | Record manual journal entries directly to G/L accounts. |
| **FB60 / F-90**| Enter Vendor Invoice / Asset | Post vendor invoices without reference to a Purchase Order. |
| **FB70** | Enter Customer Invoice | Post customer invoices directly in FI. |
| **F-53** | Post Outbound Payment | Post cash/bank payment to clear vendor liabilities. |
| **F-28** | Post Incoming Payments | Record incoming payments from customers to clear AR invoices. |
| **FAGLB03** | G/L Account Balance | Display balances and drill-down into G/L transactions. |
| **F.01** | Financial Statements | Run Balance Sheet and Profit & Loss reports. |

#### Key Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **SKA1** | G/L Account Master (Chart of Accounts) | Master |
| **SKB1** | G/L Account Master (Company Code) | Master |
| **BKPF** | Accounting Document Header | Transaction |
| **BSEG** | Accounting Document Segment (Line Items) | Transaction |
| **FAGLFLEXA**| General Ledger Actual Line Items (New G/L) | Transaction |

---

### Business Processes
The main business flow in FI is the **Record-to-Report (R2R)** cycle:
1. **Transaction Recording:** Daily journal entries are posted from MM (Goods Receipt/Invoice Verification), SD (Billing), and manual postings (`FB50`).
2. **Subledger Reconciliation:** Customer (AR) and Vendor (AP) postings are synchronized in real-time with the central G/L via designated Reconciliation Accounts.
3. **Closing Operations:** Activities performed at month-end or year-end (foreign currency valuation, accrued expenses, fixed asset depreciation run `AFAB`).
4. **Reporting:** Generating the legally mandated Balance Sheet and Profit & Loss statement (`F.01`).

---

### Integration with Other Modules
SAP FI integrates with almost every operational module:
* **MM (Materials Management):** Goods receipts trigger stock debits and GR/IR credits. Invoice receipts clear GR/IR and credit the vendor in Accounts Payable.
* **SD (Sales and Distribution):** Outbound delivery billing posts a debit to the customer account in Accounts Receivable and a credit to Revenue G/L accounts.
* **CO (Controlling):** Expense postings to G/L accounts that are defined as Primary Cost Elements are automatically mirrored in CO.
* **HCM (Human Capital Management):** Payroll calculations run in HCM and post salaries expense and employee liabilities directly to the General Ledger.

---

### Real Industry Examples
* **Scenario:** A retail company pays its monthly office utilities invoice. The AP clerk uses `FB60` to post a $1,200 invoice from a utility provider. The transaction debits "Electricity Expense" and credits the Utility Vendor account. This updates the AP subledger and the reconciliation account immediately.

---

### Interview Questions

#### Q1: What is a Reconciliation Account in SAP FI?
**Answer:** A reconciliation account is a special G/L account that links the subledgers (like Accounts Payable, Accounts Receivable, Asset Accounting) to the central General Ledger in real-time. Direct manual postings cannot be made to reconciliation accounts. When you post an invoice to a customer (subledger), the system automatically updates the designated AR Reconciliation G/L account.

#### Q2: What is the "New G/L" in SAP ECC?
**Answer:** The "New G/L" (introduced in ECC 6.0) combines G/L, profit center accounting, segment reporting, and cost-of-sales accounting into a single ledger structure (using tables like `FAGLFLEXA`/`FAGLFLEXT`). It enables parallel accounting (multiple ledgers for different local/global standards like US GAAP and IFRS) and real-time document splitting (splitting tax or cash lines automatically by profit center or business segment).
