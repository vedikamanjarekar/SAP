# SAP ECC Interview Preparation Guide

This guide contains a curated list of interview questions and scenario-based tests, structured from beginner concepts to advanced functional and technical challenges.

---

## 1. Beginner Level Questions

### Q1.1: What does SAP stand for and what is SAP ECC?
**Answer:** 
* **SAP** stands for *Systems, Applications, and Products in Data Processing*.
* **SAP ECC** (ERP Central Component) is a suite of core enterprise applications integrated on a single database. It serves as the legacy flagship ERP system of SAP, succeeded by SAP S/4HANA.

### Q1.2: Explain the SAP R/3 3-Tier architecture.
**Answer:** The architecture splits operations into three layers:
1. **Presentation Layer (Client):** The user interface (SAP GUI or Web Browser) which takes user input and displays results.
2. **Application Layer (Server):** Houses the Dispatcher and Work Processes that run the ABAP programs containing the business logic.
3. **Database Layer (Server):** The central database hosting all master records, configuration data, and transaction entries.

### Q1.3: What is a Client in an SAP system?
**Answer:** A Client is a self-contained organizational and commercial unit within a single SAP database instance. It has its own isolated master data, transaction tables, and user records. Clients are designated by 3-digit numbers (e.g., Client `100` for development, Client `800` for production).

---

## 2. Intermediate Functional Questions

### Q2.1: Explain the difference between master data, transactional data, and customizing data.
**Answer:**
* **Customizing (Configuration) Data:** Highly static data configured by consultants in `SPRO` that sets the organizational rules (e.g., Company Code definitions, tax rates). Transported across systems.
* **Master Data:** Semi-static data representing core business entities (e.g., Material Master, Vendor Master, Customer Master). It remains in the system for years and is used across transactions.
* **Transactional Data:** Short-lived, highly dynamic data recording operational events (e.g., Purchase Order `4500010012`, Billing Invoice `90001423`).

### Q2.2: Walk through the standard Procure-to-Pay (P2P) process flow and name the T-Codes.
**Answer:**
1. **Purchase Requisition (PR):** T-Code `ME51N`
2. **Request for Quotation (RFQ):** T-Code `ME41`
3. **Quotation Maintenance:** T-Code `ME47`
4. **Purchase Order (PO):** T-Code `ME21N`
5. **Goods Receipt (GR):** T-Code `MIGO`
6. **Invoice Verification (IR):** T-Code `MIRO`
7. **Vendor Payment (FI):** T-Code `F-53`

### Q2.3: Walk through the standard Order-to-Cash (O2C) process flow and name the T-Codes.
**Answer:**
1. **Inquiry:** T-Code `VA11`
2. **Quotation:** T-Code `VA21`
3. **Sales Order (SO):** T-Code `VA01`
4. **Outbound Delivery:** T-Code `VL01N`
5. **Goods Picking (WM/IM):** T-Code `LT03` / `VL02N`
6. **Post Goods Issue (PGI):** T-Code `VL02N`
7. **Billing (Invoice):** T-Code `VF01`
8. **Customer Payment Clear:** T-Code `F-28`

---

## 3. Technical & Basis Questions

### Q3.1: What is the purpose of the SAP Enqueue Work Process?
**Answer:** The Enqueue process (`ENQ`) manages logical locks on business objects. Since multiple database updates occur asynchronously, standard database locks are insufficient. When a user opens a Sales Order in Change mode, the Enqueue process writes a lock entry to the lock table (visible in `SM12`) to prevent other users from modifying the same record simultaneously.

### Q3.2: How do you handle an ABAP runtime dump error (`ST22`)?
**Answer:**
1. Open T-Code **`ST22`** and locate the dump by timestamp, user, or transaction.
2. Read the **"What happened?"** and **"Error analysis"** sections to identify the error type (e.g., `CX_SY_ZERODIVIDE`, `ITAB_DUPLICATE_KEY`).
3. Look at the **"Source Code Extract"** to pinpoint the exact line of code that caused the crash.
4. Check if the error is due to bad data inputs (user training required) or an unhandled exception in custom ABAP code (developer correction required).

### Q3.3: What is the difference between a Customizing Request and a Workbench Request in the Transport Management System?
**Answer:**
* **Customizing Request:** Contains client-dependent changes. Configurations saved here will only apply to the specific client where they were made (e.g., assigning a plant to a purchasing organization).
* **Workbench Request:** Contains client-independent changes. This includes ABAP repository objects, DDIC structures, or program code. Modifying these immediately affects all clients sharing that physical system instance.

---

## 4. Scenario-Based & Business Cases

### Scenario 4.1: The Inventory Discrepancy
* **Problem:** A warehouse worker is performing a Goods Receipt (`MIGO`) for a Purchase Order, but gets the error: `G/L account 160000 (GR/IR clearing) cannot be posted to`. How do you troubleshoot this?
* **Troubleshooting Steps:**
  1. The error indicates a discrepancy in automatic account determination or G/L account settings.
  2. Use **T-Code `FS00`** to check the status of G/L Account `160000` in the current Company Code. Check if it is blocked for posting or if it is missing from the Chart of Accounts.
  3. Open **T-Code `OBYC`** and check the configuration mapping for Transaction Key **`WRX`** (GR/IR clearing). Verify if the valuation class of the material in the PO is mapped correctly to this G/L account.
  4. Ensure the field status group of the G/L account allows the cost objects (like Cost Center or Profit Center) passed by the PO.

### Scenario 4.2: The Blocked Sales Order
* **Problem:** A sales representative tries to release an Outbound Delivery (`VL01N`) for a Sales Order, but the system shows `Credit Limit Exceeded: Order Blocked for Delivery`. What is the process to resolve this?
* **Troubleshooting Steps:**
  1. This is triggered by **SAP Credit Management**. The customer's outstanding balance + current order value exceeds their credit limit defined in their customer master.
  2. Open **T-Code `VKM3`** (Released SD Documents) or **`VKM1`** to view the blocked sales order.
  3. A Credit Manager or authorized accountant must review the customer's payment history and either:
     * Manually approve and release the credit block inside `VKM3`.
     * Request the customer pay outstanding invoices before releasing the delivery.
     * Increase the customer's credit limit via **T-Code `FD32`** (Credit Master Sheet) if business risk permits.

### Scenario 4.3: The Stale Outbound IDoc
* **Problem:** An Outbound IDoc for a Sales Order Invoice has been generated but is stuck at Status `30` (Data passed to port OK) or Status `02` (Error during transmission). How do you resolve this?
* **Troubleshooting Steps:**
  1. Status `30` means the IDoc has been generated but is waiting in the outbound queue to be picked up by the EDI subsystem. Run program `RSEOUT00` or use T-Code `BD87` to manually trigger transmission.
  2. For Status `02` (Transmission error), open the IDoc in **T-Code `WE02`** or **`WE05`** and expand the Status Record details to read the operating system/network error message.
  3. Go to **T-Code `SM59`** and execute a connection test on the RFC destination mapped to the Port (`WE21`) in the Partner Profile (`WE20`). If the connection test fails, the issue is a network connection breakdown between SAP and the EDI translation server.
