# SAP QM: Quality Management Module

This document provides a comprehensive breakdown of the **SAP QM (Quality Management)** module, which governs quality assurance across the product lifecycle in SAP ECC.

---

### Module Overview
SAP QM ensures that products, processes, and services meet defined corporate and regulatory standards. It supports quality planning (setting inspection standards), quality inspection (testing materials), and quality control (handling defects, notifications, and continuous improvement).

---

### Key Functions
* **Quality Planning (QM-PT):** Defining inspection checklists, testing protocols, and sampling methods.
* **Quality Inspection (QM-IM):** Creating inspection lots, recording inspection results, and posting usage decisions.
* **Quality Certificates (QM-CA):** Generating certificates of analysis (CoAs) for outgoing deliveries or checking them for vendor receipts.
* **Quality Notifications (QM-QN):** Recording deviations, customer complaints, or internal defects to track corrective actions.

---

### Important Master Data
* **Inspection Characteristic (MIC - T-Code `QS21`):** Defines the technical properties to inspect (e.g., width of a steel sheet, pH value of a chemical, visual scratch test). Can be quantitative or qualitative.
* **Inspection Method (T-Code `QS31`):** Details the procedure or tools to test a characteristic (e.g., "Use digital caliper", "Test under 200°C").
* **Sampling Procedure (T-Code `QDV1`):** Defines the sample size to pull (e.g., test 10% of delivery lot, or check a fixed size of 5 units).
* **Inspection Plan (T-Code `QP01`):** Combines MICs, methods, and sampling rules to define the sequence of tests for a specific material.

---

### Common Transactions (T-Codes) & Tables

#### Core Transaction Codes
| T-Code | Description | Purpose |
| :--- | :--- | :--- |
| **QS21 / QS22** | Create / Change MIC | Maintain Master Inspection Characteristics |
| **QP01 / QP02** | Create / Change Inspection Plan | Define the list of tests per material |
| **QA01 / QA03** | Create / Display Inspection Lot | Manually trigger or view an inspection lot |
| **QE51N** | Record Results | Enter test measurements or pass/fail flags for a lot |
| **QA11** | Record Usage Decision | Post final release/reject status (Usage Decision) for a lot |
| **QM01 / QM02** | Create / Change Quality Notification | Log customer complaints or internal defects |

#### Key Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **QMAT** | Inspection Type Link to Material | Master |
| **QMTB** | Inspection Method Master | Master |
| **QAMV** | Characteristic Specifications | Master |
| **QALS** | Inspection Lot Record | Transaction |
| **QASE** | Results Recording Detail | Transaction |
| **QMEL** | Quality Notification Header | Transaction |

---

### Business Processes
The standard Quality Inspection process is triggered during procurement or production:
1. **Lot Triggering:** When a Goods Receipt is posted in MM (MIGO) for an inspection-managed material, the stock is automatically placed in **Quality Inspection Stock**, and an **Inspection Lot** (`QALS`) is generated.
2. **Testing:** Laboratory technicians use `QE51N` to retrieve the lot and record test values against the Inspection Plan.
3. **Usage Decision (`QA11`):** The Quality Manager reviews results. If they pass, they post a **Usage Decision (UD)** to approve release.
4. **Stock Posting:** Based on the UD, the stock is automatically moved from Quality stock to **Unrestricted Use Stock** (or to **Blocked Stock** if it fails).

---

### Integration with Other Modules
* **MM (Materials Management):** Integrates at Goods Receipt (`MIGO`) to isolate new shipments in quality stock. Integrates with Vendor Evaluation to penalize vendors shipping substandard material.
* **PP (Production Planning):** Integrates during manufacturing. Inspection lots are generated at production order release to test operations or verify finished goods before storage.
* **SD (Sales and Distribution):** Integrates during delivery. The system checks if outgoing batches have passed quality tests and automatically prints Quality Certificates for shipping documents.

---

### Real Industry Examples
* **Scenario:** A pharmaceutical company receives an active ingredient shipment. The receipt triggers an inspection lot. Laboratory tests show the purity is 99.8% (matching the plan's specification of >99%). The manager enters a Usage Decision in `QA11` to release the batch. The system automatically transfers the material to unrestricted stock.

---

### Interview Questions

#### Q1: What is a Usage Decision (UD) in SAP QM?
**Answer:** A Usage Decision is the final step in the quality inspection process. It represents the quality manager's decision on whether the inspection lot has passed inspection parameters. Posting a UD triggers the release of material from Quality Inspection stock to Unrestricted Use stock, or redirects it to Scrap / Blocked stock, and updates quality statistics.

#### Q2: What is the difference between Quantitative and Qualitative Characteristics?
**Answer:** 
* **Quantitative Characteristics:** Involve measurable values (e.g., length in mm, temperature in °C, weight in kg). The system checks if the input value falls within configured upper/lower limits.
* **Qualitative Characteristics:** Involve attribute-based attributes (e.g., color: red/green/yellow, visual surface: scratch-free/defective). The system uses predefined code groups for verification.
