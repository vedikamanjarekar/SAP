# Top 100 SAP ECC Interview Questions & Answers

This guide contains a comprehensive list of 100 SAP ECC interview questions and answers, designed to help students, interns, and consultants prepare for placement drives and technical interviews.

---

## Table of Contents
1. [Financial Accounting (FI)](#1-financial-accounting-fi)
2. [Controlling (CO)](#2-controlling-co)
3. [Materials Management (MM)](#3-materials-management-mm)
4. [Sales and Distribution (SD)](#4-sales-and-distribution-sd)
5. [Production Planning (PP)](#5-production-planning-pp)

---

## 1. Financial Accounting (FI)

### Beginner Level (FI)

#### Q1.1: What is SAP FI and why is it important?
**Answer:** SAP Financial Accounting (FI) is a core module that records an organization's financial transactions. It is important because it generates legally mandated financial statements, such as the Balance Sheet and Profit & Loss (P&L) statements, for external stakeholders like tax authorities, shareholders, and auditors.

#### Q1.2: What is a Company Code in SAP?
**Answer:** A Company Code is the smallest organizational unit in Financial Accounting for which a complete, independent set of accounts (Balance Sheet, P&L) can be generated. It represents a legal entity.

#### Q1.3: What is a Chart of Accounts (COA)?
**Answer:** A Chart of Accounts is a structured list of all General Ledger (G/L) accounts used by one or more Company Codes. It contains the account number, account name, and classification (Balance Sheet or Income Statement).

#### Q1.4: Define Reconciliation Account.
**Answer:** A Reconciliation Account is a G/L account that connects subledgers (like Accounts Payable for vendors or Accounts Receivable for customers) with the central General Ledger. When postings are made to a subledger, the reconciliation account is updated automatically. Direct manual postings cannot be made to it.

#### Q1.5: What are posting periods?
**Answer:** Posting periods are time intervals (usually months) within a fiscal year variant during which business transactions can be posted. They are controlled using Posting Period Variants to prevent accidental postings to closed accounting months.

#### Q1.6: What is the purpose of T-Code `FS00`?
**Answer:** `FS00` is used to create, change, or display General Ledger accounts centrally. It contains details at both the Chart of Accounts level (e.g., account type) and the Company Code level (e.g., currency, reconciliation indicator).

---

### Intermediate Level (FI)

#### Q1.7: What is the "New G/L" in SAP ECC 6.0?
**Answer:** The New G/L integrates multiple ledgers (General Ledger, Profit Center, Segment, Cost-of-Sales) into a single ledger database (using tables like `FAGLFLEXA`). It supports real-time Document Splitting and parallel accounting.

#### Q1.8: Explain Document Splitting in New G/L.
**Answer:** Document Splitting is a feature that automatically splits line items (such as tax or cash discount lines) based on dimensions like Profit Center or Segment. This ensures that a Balance Sheet can be generated at the segment or profit center level.

#### Q1.9: What is the difference between a Fiscal Year Variant and a Posting Period Variant?
**Answer:**
* **Fiscal Year Variant (FYV):** Defines the calendar structure (e.g., 12 posting periods and 4 special periods for audit adjustments).
* **Posting Period Variant (PPV):** Controls which specific periods within that structure are open or closed for posting at any given time.

#### Q1.10: What is a Field Status Group (FSG)?
**Answer:** Stored in G/L account master data, a Field Status Group controls the display status of fields during document posting (i.e., whether a field like Cost Center, Text, or Allocation is Suppressed, Optional, or Required).

#### Q1.11: How do you clear vendor invoices in Accounts Payable?
**Answer:** You use T-Code `F-53` (Post Outbound Payment) to select open items, enter the payment amount, and execute the payment. The system debits the vendor account and credits the bank account, changing the open item status to cleared.

#### Q1.12: What is the difference between residual payment and partial payment?
**Answer:**
* **Partial Payment:** The original invoice remains open on the account, and a new payment document is posted referencing the invoice.
* **Residual Payment:** The original invoice is cleared, and a new open item is created for the remaining unpaid balance.

#### Q1.13: What is "Dunning" in SAP FI?
**Answer:** Dunning is the automated process of sending payment reminders or collection letters to customers with overdue balances. It is configured based on dunning levels, dunning areas, and dunning procedures.

#### Q1.14: Explain the role of the GR/IR Clearing Account.
**Answer:** The GR/IR (Goods Receipt / Invoice Receipt) account is a temporary clearing account that matches inventory values with supplier invoices. It offsets inventory debits during goods receipts before the vendor invoice is officially received.

---

### Advanced Level (FI)

#### Q1.15: How does SAP handle parallel accounting?
**Answer:** Parallel accounting is handled using the **Ledger Approach** in New G/L. A company designates a Leading Ledger (usually `0L`) for group reporting and Non-Leading Ledgers for local statutory reporting (e.g., local GAAP or tax standards).

#### Q1.16: Explain Asset Depreciation keys and the depreciation run.
**Answer:** A Depreciation Key contains the rules (straight-line, declining balance, etc.) and calculations for asset wear and tear. The actual depreciation postings to the G/L are executed as a batch process using T-Code `AFAB`.

#### Q1.17: What is the purpose of the Document type in SAP?
**Answer:** The Document Type (e.g., `SA` for G/L postings, `KR` for Vendor Invoices, `DR` for Customer Invoices) defines the number range allocated to the document and controls which account types (G/L, Customer, Vendor, Asset) can be posted to.

#### Q1.18: What is a Fast Entry screen?
**Answer:** A Fast Entry screen allows users to input multiple G/L line items quickly with minimal keystrokes, useful for posting large, manual journal entries.

#### Q1.19: How do you handle foreign currency valuation at month-end?
**Answer:** You run program `FAGL_FC_VAL` to evaluate open items and balances in foreign currencies against the exchange rates at the closing date. The system posts unrealized gains/losses to expense/revenue accounts and adjusts the balance sheet values.

#### Q1.20: What is the table structure for accounting documents in SAP ECC?
**Answer:** Accounting documents are split into two primary tables:
* **`BKPF`:** Contains Document Header details (Posting Date, Currency, Doc Type, Creator).
* **`BSEG`:** Contains Line Item details (G/L Account, Debit/Credit indicator, Amount, Cost Center).

---

## 2. Controlling (CO)

### Beginner Level (CO)

#### Q2.1: What is the primary purpose of SAP CO?
**Answer:** SAP Controlling (CO) is used for internal management accounting. It helps organizations plan, monitor, and calculate costs, providing management with reports for internal decision-making.

#### Q2.2: What is a Controlling Area?
**Answer:** A Controlling Area is the organizational unit in CO where cost accounting is performed. Multiple Company Codes can be assigned to a single Controlling Area, provided they share the same Chart of Accounts and Fiscal Year Variant.

#### Q2.3: What is a Cost Center?
**Answer:** A Cost Center represents a physical or logical location within a company where costs are incurred (e.g., HR, Admin, or Marketing departments). It is configured via T-Code `KS01`.

#### Q2.4: What is a Profit Center?
**Answer:** A Profit Center represents a responsibility center within an organization that generates both revenues and costs (e.g., a product line, division, or geographic office). It evaluates internal profitability.

#### Q2.5: What is a Primary Cost Element?
**Answer:** A Primary Cost Element is a cost category that corresponds directly to an expense account in Financial Accounting (FI). It is used to transfer expenditures from FI to CO.

#### Q2.6: What is a Secondary Cost Element?
**Answer:** A Secondary Cost Element exists only within Controlling. It does not have a corresponding G/L account in FI and is used for internal allocations, assessments, and distributions between cost objects.

---

### Intermediate Level (CO)

#### Q2.7: What is the difference between Cost Distribution and Cost Assessment?
**Answer:**
* **Distribution (T-Code `KSV5`):** Allocates primary costs. The original primary cost element is preserved during the transfer.
* **Assessment (T-Code `KSU5`):** Groups primary costs and allocates them using a Secondary Cost Element. The original cost details are summarized under the secondary element.

#### Q2.8: What is an Internal Order?
**Answer:** An Internal Order is a CO object used to monitor costs for a temporary project, task, or event (e.g., organizing a marketing campaign or building a prototype).

#### Q2.9: What is Activity Type Planning?
**Answer:** Activity Type Planning (T-Code `KSPB`) defines the rates charged for operations performed in a cost center (e.g., machine setup hours valued at $80/hr). These activity rates are used in production orders.

#### Q2.10: Explain the concept of Profitability Analysis (CO-PA).
**Answer:** CO-PA is a sub-module used to evaluate profit margins by market segments, customer groups, countries, or sales channels. It can be Costing-Based (uses value fields) or Account-Based (uses G/L accounts).

#### Q2.11: What is Product Cost Controlling (CO-PC)?
**Answer:** CO-PC is used to calculate the cost of manufacturing a product or providing a service. It establishes standard prices (Standard Cost Estimate) used for inventory valuation.

#### Q2.12: What is a Statistical Key Figure (SKF)?
**Answer:** A Statistical Key Figure is a measurable metric used as a allocation base for cost distribution (e.g., number of employees in a department, square footage of office space).

#### Q2.13: How do FI and CO reconcile in SAP ECC?
**Answer:** In classic SAP ECC, since FI and CO are separate modules, a Reconciliation Ledger is configured. Any cross-company or cross-business-area cost transfers in CO automatically trigger reconciliation postings in FI.

#### Q2.14: What table stores cost postings originating from FI?
**Answer:** Table **`COSP`** stores external postings (postings made to primary cost elements originating from FI documents).

---

### Advanced Level (CO)

#### Q2.15: What is a Standard Cost Estimate and how is it calculated?
**Answer:** A Standard Cost Estimate determines the cost of a material. It is calculated via T-Code `CK11N` using:
1. **Bill of Materials (BOM):** Lists component material costs.
2. **Routing:** Lists operation times multiplied by cost center activity rates.
3. **Overhead Rates:** Set in the costing sheet.
Once calculated, it is marked and released via `CK24` to update the Material Master.

#### Q2.16: Explain Cost Center Settlement.
**Answer:** Settlement is the process of transferring costs collected in a temporary sender object (like an Internal Order or a Production Order) to a permanent receiver object (like a Cost Center, Asset, or G/L account) using T-Code `KO88`.

#### Q2.17: What are the main tables in CO-PA?
**Answer:** Costing-based CO-PA uses dynamically generated tables prefixed with `CE1` (Actual Line Items), `CE2` (Plan Line Items), and `CE3` (Summary Table) followed by the Operating Concern code.

#### Q2.18: What is a Valuation Variant in Product Costing?
**Answer:** A Valuation Variant defines how the system prices materials, activity types, subcontracting, and overheads during standard costing calculations (e.g., whether to use average purchase price, plan price, or current info record price).

#### Q2.19: How do you calculate production variances in CO?
**Answer:** Variances are calculated using T-Code `KKS2` by comparing the actual costs debited to a Production Order (materials issued + labor confirmed) against the standard cost credited to the order during Goods Receipt.

#### Q2.20: Explain the relationship between Cost Elements and G/L Accounts in ECC vs. S/4HANA.
**Answer:** In ECC, G/L accounts and Cost Elements are separate master records created in different transactions (`FS00` and `KA01`). In S/4HANA, they are merged; cost elements are created directly within `FS00` as specific Account Types (Primary Costs or Secondary Costs).

---

## 3. Materials Management (MM)

### Beginner Level (MM)

#### Q3.1: What is SAP MM?
**Answer:** SAP Materials Management (MM) is a core logistics module that manages the procurement activities, vendor relationships, material master records, and inventory levels of an organization.

#### Q3.2: What is the enterprise structure in SAP MM?
**Answer:** The MM organizational units are:
* **Plant:** A physical manufacturing, storage, or distribution location.
* **Storage Location:** A subdivision of a plant where stock is physically kept.
* **Purchasing Organization:** The unit responsible for negotiating buying terms with vendors.
* **Purchasing Group:** A buyer or group of buyers.

#### Q3.3: What is a Purchase Requisition (PR)?
**Answer:** A PR (T-Code `ME51N`) is an internal request created by a department asking the purchasing team to procure a specific quantity of goods or services by a certain date.

#### Q3.4: What is a Purchase Order (PO)?
**Answer:** A PO (T-Code `ME21N`) is a legally binding contract sent by the purchasing organization to a vendor, committing to buy materials under specified terms, pricing, and delivery dates.

#### Q3.5: Define Goods Receipt.
**Answer:** A Goods Receipt (T-Code `MIGO`) is posted when physical goods are delivered by a vendor to the warehouse, increasing the physical inventory quantity in the system.

#### Q3.6: What is the purpose of T-Code `MMBE`?
**Answer:** `MMBE` is the Stock Overview report. It provides a real-time view of inventory levels for a specific material across Company Codes, Plants, Storage Locations, and Stock Types (Unrestricted, Quality, Blocked).

---

### Intermediate Level (MM)

#### Q3.7: Explain the 3-Way Match in Invoice Verification.
**Answer:** During Invoice Verification (`MIRO`), the system executes a 3-way match by verifying:
1. The **Purchase Order** (for agreed price and terms).
2. The **Goods Receipt** (for actual delivered quantity).
3. The **Vendor Invoice** (for billed amount and quantities).
If discrepancies exceed tolerances, the invoice is blocked for payment.

#### Q3.8: What is a Purchase Info Record (PIR)?
**Answer:** A PIR (T-Code `ME11`) stores default purchasing information for a specific material-vendor combination (e.g., standard price, planned delivery time, tolerances, and tax codes).

#### Q3.9: What is a Source List?
**Answer:** A Source List (T-Code `ME01`) defines the list of valid vendors allowed to supply a material for a plant over a specific date range. It can also be used to block specific vendors.

#### Q3.10: What is a Movement Type in SAP?
**Answer:** A Movement Type is a 3-digit key (e.g., `101` for Goods Receipt, `261` for issuing stock to production, `601` for sales delivery) that controls the screen layouts, database updates, and G/L account determinations for material transactions.

#### Q3.11: Explain the difference between Unrestricted, Quality Inspection, and Blocked Stock.
**Answer:**
* **Unrestricted Use:** Valued stock available for any production or sales transaction.
* **Quality Inspection:** Stock isolated for testing; cannot be issued or sold.
* **Blocked Stock:** Damaged or rejected stock; restricted from all standard business processes.

#### Q3.12: What is the table that stores general material data?
**Answer:** Table **`MARA`** stores general material data (client-independent properties like base unit of measure, material type, weight).

#### Q3.13: What is the purpose of table `EKPO`?
**Answer:** Table `EKPO` stores transactional line items for all purchasing documents, including Purchase Orders and contracts.

#### Q3.14: Explain the difference between a Contract and a Scheduling Agreement.
**Answer:**
* **Contract:** A long-term agreement specifying prices and total target value/quantity. Release orders are created manually to request deliveries.
* **Scheduling Agreement:** Specifies fixed delivery dates and times. Deliveries are generated automatically based on schedule lines.

---

### Advanced Level (MM)

#### Q3.15: How does Automatic Account Determination work in MM?
**Answer:** Triggered during material postings, the system reads:
1. Chart of Accounts (linked to Company Code).
2. Transaction/Event Key (e.g., `BSX` for stock, `WRX` for GR/IR) based on the movement type.
3. Valuation Grouping Code (groups plants).
4. Valuation Class (from Material Master).
Using these keys, T-Code **`OBYC`** maps the transaction to a specific G/L account.

#### Q3.16: What is a Valuation Class and why is it used?
**Answer:** The Valuation Class is a field on the Material Master (Accounting view) that groups materials with similar financial characteristics. It avoids the need to configure G/L accounts for every individual material code.

#### Q3.17: What is Split Valuation?
**Answer:** Split Valuation allows a company to value the same material at different prices within the same plant based on criteria like origin (local vs. imported), quality (grade A vs. grade B), or production source (in-house vs. external).

#### Q3.18: Explain the significance of the table `VBFA` to MM.
**Answer:** `VBFA` is the Document Flow table. While primarily an SD table, it links purchase requisitions, orders, delivery receipts, and invoices together, allowing users to trace the history of a transaction.

#### Q3.19: What is Consignment Stock?
**Answer:** Vendor Consignment Stock is inventory stored physically at the buyer's warehouse, but still owned by the vendor. The buyer only pays for the stock when it is consumed/withdrawn from the warehouse.

#### Q3.20: How do you troubleshoot the error: "G/L account not defined in OBYC"?
**Answer:**
1. Note the Transaction Key (e.g., `GBB`) and Valuation Class from the error.
2. Open T-Code `OBYC`, click the transaction key.
3. Verify if an entry exists mapping the Valuation Class and General Modification key to an active G/L account. If missing, configure the G/L account.

---

## 4. Sales and Distribution (SD)

### Beginner Level (SD)

#### Q4.1: What is the main objective of SAP SD?
**Answer:** SAP Sales and Distribution (SD) manages all sales-related processes, including customer inquiries, quotations, sales orders, deliveries, shipping, and customer invoicing.

#### Q4.2: What elements make up a Sales Area?
**Answer:** A Sales Area is a mandatory combination of:
1. **Sales Organization:** Legal entity responsible for sales.
2. **Distribution Channel:** Method of product delivery (Wholesale, Retail, Online).
3. **Division:** The product group (Electronics, Parts).

#### Q4.3: What is a Sales Order?
**Answer:** A Sales Order (T-Code `VA01`) is a contract between a company and a customer for the supply of specific goods or services at a set price, quantity, and date.

#### Q4.4: What is Post Goods Issue (PGI)?
**Answer:** PGI (T-Code `VL02N`) is the step where physical goods are shipped out of the plant. It reduces warehouse inventory and creates financial postings for Cost of Goods Sold.

#### Q4.5: What is the table that stores Customer Master general data?
**Answer:** Table **`KNA1`** stores Customer Master general data (address, name, country).

#### Q4.6: What is a Shipping Point?
**Answer:** A Shipping Point is the physical location (e.g., a shipping dock or loading bay) within a plant from which deliveries are loaded and sent out.

---

### Intermediate Level (SD)

#### Q4.7: Walk through the Order-to-Cash (O2C) workflow.
**Answer:**
1. Inquiry (`VA11`) & Quotation (`VA21`).
2. Sales Order (`VA01`).
3. Outbound Delivery (`VL01N`).
4. Picking/Packing (`LT03` / `VL02N`).
5. Post Goods Issue (`VL02N`).
6. Billing (`VF01`).
7. Customer Payment (`F-28`).

#### Q4.8: How is the Shipping Point determined in a Sales Order?
**Answer:** The system determines it automatically using:
1. **Shipping Condition:** From Customer Master.
2. **Loading Group:** From Material Master.
3. **Delivering Plant:** From Sales Order line item.

#### Q4.9: What is the purpose of Revenue Account Determination (T-Code `VKOA`)?
**Answer:** `VKOA` maps sales transactions to correct G/L revenue accounts automatically. It uses criteria like Chart of Accounts, Sales Org, Account Assignment Group of Customer, Account Assignment Group of Material, and Account Key (e.g., `ERL`).

#### Q4.10: What is the "Document Flow" in SAP SD?
**Answer:** Document Flow (T-Code `VA03` -> Environment -> Document Flow) tracks the chain of documents associated with a transaction (e.g., showing that Sales Order X led to Delivery Y, which led to Invoice Z).

#### Q4.11: What is the difference between a Sold-to Party and a Ship-to Party?
**Answer:**
* **Sold-to Party:** The customer entity who places the order.
* **Ship-to Party:** The physical location where the goods are delivered.

#### Q4.12: Explain Availability Check (ATP).
**Answer:** ATP (Available-to-Promise) checks if inventory is available to fulfill a sales order line item by analyzing current stock, planned production, and pending customer demands.

#### Q4.13: What table stores Sales Order Header data?
**Answer:** Table **`VBAK`** stores Sales Order Header data.

#### Q4.14: What is the table that stores Outbound Delivery line items?
**Answer:** Table **`LIPS`** stores Outbound Delivery item details.

---

### Advanced Level (SD)

#### Q4.15: Explain the Condition Technique in SD.
**Answer:** The Condition Technique is the logic used to determine pricing, taxes, or outputs. It searches a hierarchy using:
1. **Condition Type:** The price component (e.g., base price `PR00`, discount `K007`).
2. **Access Sequence:** Defines the search order (most specific to most general).
3. **Condition Table:** Stores the pricing rates.
4. **Pricing Procedure:** Groups condition types in a structured sequence.

#### Q4.16: How does the system determine the Pricing Procedure in a Sales Order?
**Answer:** It uses the combination of:
1. **Sales Area** (Sales Org + Distribution Channel + Division).
2. **Document Pricing Procedure:** From the Sales Order Type.
3. **Customer Pricing Procedure:** From the Customer Master.

#### Q4.17: What is the table `VBFA` and why is it critical?
**Answer:** `VBFA` is the **Sales Document Flow** table. It records the relationships between upstream and downstream documents (e.g., links Sales Order line to Delivery line to Billing line).

#### Q4.18: What is a Credit Block and how do you resolve it?
**Answer:** A Credit Block occurs when a sales order exceeds a customer's credit limit. Deliveries cannot be processed. It is resolved using T-Code **`VKM3`**, where an authorized Credit Manager reviews the account and releases the document.

#### Q4.19: What is the difference between Billing and Invoicing?
**Answer:**
* **Billing (`VF01`):** The SD transaction that compiles sales deliveries to calculate billing amounts.
* **Invoicing:** The financial posting that records the debit to customer accounts receivable and revenue in FI.

#### Q4.20: Explain the purpose of Item Categories in Sales Orders.
**Answer:** The Item Category (e.g., `TAN` for standard item, `TAD` for service) controls the behavior of a line item, determining if it is relevant for delivery, billing, pricing, or inventory tracking.

---

## 5. Production Planning (PP)

### Beginner Level (PP)

#### Q5.1: What is SAP PP and what is its main objective?
**Answer:** SAP Production Planning (PP) is a core module that plans and monitors manufacturing operations, matching material availability and capacity with sales requirements.

#### Q5.2: Name the core Master Data in SAP PP.
**Answer:** Core Master Data objects are:
1. Bill of Materials (BOM).
2. Routing.
3. Work Center.
4. Material Master (MRP views).

#### Q5.3: What is a Bill of Materials (BOM)?
**Answer:** A BOM (T-Code `CS01`) is a structured list of raw materials, parts, or components required to manufacture a parent product.

#### Q5.4: What is a Work Center?
**Answer:** A Work Center (T-Code `CR01`) is a physical location (machine, assembly line, or labor team) where manufacturing steps (operations) are performed.

#### Q5.5: What is Routing?
**Answer:** Routing (T-Code `CA01`) defines the sequence of operations, steps, and standard times (setup, machine, labor) required to produce a material.

#### Q5.6: What is the purpose of T-Code `MD04`?
**Answer:** `MD04` is the Stock/Requirements List. It is a live, dynamic report showing the current stock level, sales demands, and planned production supplies for a material.

---

### Intermediate Level (PP)

#### Q5.7: Walk through the Plan-to-Produce workflow.
**Answer:**
1. Forecast Demand / Sales Plan.
2. Run MRP (`MD01`/`MD02`) to generate planned orders.
3. Convert Planned Order to Production Order (`CO40`).
4. Release Production Order.
5. Issue raw materials (`MIGO` - `261`).
6. Confirm operations (`CO11N`).
7. Goods Receipt of finished product (`MIGO` - `101`).
8. Order Settlement (`KO88`).

#### Q5.8: What is Material Requirements Planning (MRP)?
**Answer:** MRP is an automated calculation that checks material availability. If shortages exist (based on sales orders or forecasts), it creates Planned Orders for in-house manufacturing or Purchase Requisitions for external buying.

#### Q5.9: Explain the difference between Discrete, Process, and Repetitive Manufacturing.
**Answer:**
* **Discrete Manufacturing:** Production based on orders for distinct, individual items (e.g., cars, bikes). Uses BOMs and Routings.
* **Process Manufacturing:** Production based on formulas and recipes (e.g., chemicals, food, paint). Uses Master Recipes.
* **Repetitive Manufacturing:** Continuous production of the same product over a long period (e.g., paper roll manufacturing). Uses Rate-based planning.

#### Q5.10: What is a Production Order Confirmation?
**Answer:** Confirmation (T-Code `CO11N`) is the step where actual labor hours, machine run times, and quantities produced are recorded against order operations.

#### Q5.11: What is Capacity Planning?
**Answer:** Capacity Planning evaluates the capacity loads at Work Centers against the scheduled production requirements, helping planners identify machine or labor bottlenecks.

#### Q5.12: What table links a Material to its BOM?
**Answer:** Table **`MAST`** links material codes to their Bill of Material numbers.

#### Q5.13: What table contains BOM line item components?
**Answer:** Table **`STPO`** contains the detailed item components and quantities of a BOM.

#### Q5.14: What is the difference between a planned order and a production order?
**Answer:** A Planned Order is a draft document created by MRP to balance supply and demand. A Production Order is a committed manufacturing document that reserves capacities, allocates costs, and allows material consumption.

---

### Advanced Level (PP)

#### Q5.15: How does the system determine the Work Center hourly rate during confirmation?
**Answer:** The Work Center contains a Cost Center link and formulas. Confirming activity times multiplies those hours by the Activity Rates defined for the Cost Center in Controlling (`KP26`/`KSPB`), charging labor and overhead costs to the Production Order.

#### Q5.16: What is a Backflushing posting?
**Answer:** Backflushing is the automatic consumption posting of raw materials during operations confirmation (`CO11N`). Instead of posting material issues manually in `MIGO`, the system calculates consumption based on the BOM definition and posts it in the background.

#### Q5.17: What are MRP Controllers?
**Answer:** An MRP Controller is a person or group responsible for planning and managing the stock availability of specific material groups. Material Master MRP views are assigned to an MRP Controller code.

#### Q5.18: Explain the difference between MRP run types: NETCH and NEUPL.
**Answer:**
* **NETCH (Net Change Planning):** The system only plans materials that have experienced changes in demand or supply since the last MRP run. It is fast and typically scheduled daily.
* **NEUPL (Regenerative Planning):** The system plans all materials, recalculating all requirements regardless of changes. It is resource-heavy and run periodically (e.g., weekly/monthly).

#### Q5.19: What is the purpose of the table `AFKO`?
**Answer:** Table `AFKO` contains order header data specific to Production Planning (scheduling times, planned quantities, scrap calculations).

#### Q5.20: How are production variances settled to Controlling?
**Answer:** Once a production order is marked as Technically Complete (TECO), the variance settlement program (`KO88`) is run. It compares actual material/labor debits against standard goods receipt credits and transfers the variance to Controlling (CO) profitability dimensions.
