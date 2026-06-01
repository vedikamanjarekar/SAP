# SAP SD: Sales and Distribution Module

This document provides a comprehensive breakdown of the **SAP SD (Sales and Distribution)** module, which manages customer-facing transactions and sales operations in SAP ECC.

---

### Module Overview
SAP SD handles all customer transactions from initial inquiries and sales quotations to sales orders, deliveries, picking, packing, shipping, and final customer billing. The primary objective is to optimize the revenue-generation cycle and customer-service delivery of an organization.

---

### Key Functions
* **Sales Support (SD-CAS):** Tracks customer contacts, competitor analyses, and marketing mailings.
* **Sales Order Processing (SD-SLS):** Manages inquiries, quotations, sales orders, contracts, and scheduling agreements.
* **Shipping (SD-SHP):** Controls picking, packing, shipping points, and outbound deliveries.
* **Billing (SD-BIL):** Processes invoice generation, credit memos, and debit memos.
* **Basic Functions (SD-BF-PR):** Manages pricing rules, credit limit checks, and material determination.

---

### Important Master Data
* **Customer Master Record (T-Codes `XD01`/`XD02`/`XD03`):** Stores customer contact data, shipping addresses, tax classifications, reconciliation accounts, and payment terms.
* **Customer-Material Info Record (T-Code `VD51`):** Links customer-specific material names/codes to internal company material IDs, defining default delivering plants and shipping tolerances.
* **Pricing Condition Records (T-Code `VK11`):** Defines prices, surcharges, discounts, and tax rates based on sales variables.

---

### Common Transactions (T-Codes) & Tables

#### Core Transaction Codes
| T-Code | Description | Purpose |
| :--- | :--- | :--- |
| **VA01 / VA02 / VA03** | Sales Order Processing | Create / Change / Display Sales Orders |
| **VL01N / VL02N / VL03N** | Outbound Delivery | Process Picking, Packing, and Post Goods Issue (PGI) |
| **VF01 / VF02 / VF03** | Billing (Invoice) | Create / Change / Display Billing Documents |
| **VK11 / VK12 / VK13** | Condition Maintenance | Define prices, discounts, and sales taxes |
| **XD01 / XD02 / XD03** | Customer Master | Maintain central customer accounts |
| **VA11 / VA21** | Inquiry / Quotation | Log customer queries and pricing quotes |
| **VL06O** | Outbound Delivery Monitor| Review shipment backlogs and release deliveries |

#### Key Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **KNA1** | Customer General Data | Master |
| **KNVV** | Customer Sales Data | Master |
| **VBAK** | Sales Document Header | Transaction |
| **VBAP** | Sales Document Item | Transaction |
| **LIKP** | Delivery Header Data | Transaction |
| **LIPS** | Delivery Item Data | Transaction |
| **VBRK** | Billing Document Header | Transaction |
| **VBRP** | Billing Document Item | Transaction |
| **VBFA** | Document Flow (Tracks relationships) | Transaction |

---

### Business Processes
The core business cycle in SD is the **Order-to-Cash (O2C)** flow:
1. **Presales (`VA11` / `VA21`):** Log customer inquiries and provide pricing quotations.
2. **Sales Order (`VA01`):** Create the order, defining delivering plants, shipping points, and executing credit limit checks.
3. **Delivery (`VL01N`):** Release the stock, pick, pack, and post Goods Issue (`PGI`) which debits Cost of Goods Sold (COGS) and credits inventory.
4. **Billing (`VF01`):** Generate the invoice and release it to accounting (debit customer accounts receivable, credit sales revenue).
5. **Cash Receipts (`F-28`):** Post payment in FI to clear the customer's balance.

---

### Integration with Other Modules
* **FI (Financial Accounting):** Integrates via **Revenue Account Determination (T-Code `VKOA`)**, which automatically routes sales revenues to correct G/L accounts. Also integrates with credit management.
* **MM (Materials Management):** Delivery postings check inventory availability and update stock levels dynamically during Post Goods Issue.
* **PP (Production Planning):** Sales Order requirements trigger manufacturing planning runs (MRP) to schedule production for make-to-order goods.
* **CO (Controlling):** Revenues and cost of goods sold flow directly to Profitability Analysis (CO-PA) to evaluate customer and regional profitability.

---

### Real Industry Examples
* **Scenario:** A distributor of electronics receives an order for 200 monitors from a client. The sales rep inputs the order (`VA01`). The system performs a credit check. Once approved, shipping releases the outbound delivery (`VL01N`), warehouse picks the monitors (`LT03`), and executes Post Goods Issue. The customer is billed (`VF01`), posting the revenue to G/L account `410000`.

---

### Interview Questions

#### Q1: What is the "Sales Area" in SAP SD?
**Answer:** A Sales Area is a key organizational structure combination consisting of three elements:
1. **Sales Organization:** Represents the entity responsible for distributing goods/services and legal liability.
2. **Distribution Channel:** The channel through which goods reach the customer (e.g., Wholesale, Retail, Direct).
3. **Division:** The product group classification (e.g., Spare Parts, Electronics).
All sales transactions must be assigned to a specific Sales Area.

#### Q2: How does the system automatically determine the Shipping Point?
**Answer:** The system determines the Shipping Point automatically using three criteria stored in tables:
1. **Shipping Condition:** Derived from the Customer Master (e.g., Standard, Express).
2. **Loading Group:** Derived from the Material Master (e.g., Crane, Forklift).
3. **Delivering Plant:** Derived from the Sales Order line item.
Based on this combination, the system selects the correct physical shipping dock.
