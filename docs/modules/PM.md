# SAP PM: Plant Maintenance Module

This document provides a comprehensive breakdown of the **SAP PM (Plant Maintenance)** module, which manages equipment operations and maintenance services in SAP ECC.

---

### Module Overview
SAP PM oversees the physical assets and equipment of an enterprise, ensuring optimal operational availability. The module supports three primary forms of maintenance: Preventive Maintenance (scheduled checks), Breakdown/Corrective Maintenance (emergency repairs), and Predictive Maintenance (sensor-based alerts).

---

### Key Functions
* **Technical Objects Management:** Structuring the physical layout of the facility to locate and track assets.
* **Maintenance Notifications (PM-WOC-MN):** Logging equipment issues, tracking anomalies, and requesting maintenance.
* **Maintenance Orders (PM-WOC-MO):** Budgeting, scheduling, allocating materials, and logging labor hours for maintenance work.
* **Preventive Maintenance (PM-PRM):** Automating scheduled inspections based on time intervals or measuring points (e.g., service after 3 months, or oil change after 10,000 miles).

---

### Important Master Data
* **Functional Location (T-Code `IL01`):** Represents the physical area where an equipment can be installed (e.g., `PLANT_1000 -> ASSEMBLY_BAY -> PRESS_MACHINE_AREA`).
* **Equipment (T-Code `IE01`):** Represents an individual, physical asset that needs to be tracked and maintained independently (e.g., Pump #401, Forklift #12). Equipments can be installed inside Functional Locations.
* **Measuring Point & Counter (T-Code `IK01`):** Logs readings (e.g., temperature, mileage counter, operating hours) used to trigger preventive maintenance plans.
* **Maintenance Bill of Materials (Maintenance BOM):** Structures the spare parts catalog for an equipment or functional location, making order material planning easier.

---

### Common Transactions (T-Codes) & Tables

#### Core Transaction Codes
| T-Code | Description | Purpose |
| :--- | :--- | :--- |
| **IL01 / IL02 / IL03** | Functional Location | Create / Change / Display Functional Locations |
| **IE01 / IE02 / IE03** | Equipment Master | Create / Change / Display Equipment Records |
| **IW21 / IW22** | Maintenance Notification | Log equipment breakdowns and issue requests |
| **IW31 / IW32 / IW33** | Maintenance Order | Plan, schedule, and execute repair work orders |
| **IW41** | Time Confirmation | Log maintenance technician labor hours |
| **IP01 / IP10** | Maintenance Plan / Schedule | Define and run automated schedule routines |
| **IK11** | Enter Measurement Document | Record counter or sensor data readings |

#### Key Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **IFLOT** | Functional Location Table | Master |
| **EQUI** | Equipment Master Record | Master |
| **EQKT** | Equipment Short Text Description | Master |
| **IMRG** | Measurement Document (Historical readings) | Transaction |
| **QMEL** | Maintenance Notification Details | Transaction |
| **AUFK** | Order Headers (PM orders use this shared table) | Transaction |
| **AFIH** | Maintenance Order Header Details | Transaction |

---

### Business Processes
The standard Corrective/Breakdown Maintenance process flow is:
1. **Notification (`IW21`):** A machine operator notices a pump leaking. They log a Notification, describing the issue and selecting the Equipment ID.
2. **Order Creation (`IW31`):** The maintenance planner reviews the notification and converts it into a Maintenance Order. The planner allocates spare parts from inventory and assigns maintenance technicians.
3. **Execution:** The technician reviews the order, draws materials from the warehouse (`MIGO` - movement type `261`), and performs the repair.
4. **Time Confirmation (`IW41`):** The technician enters the actual hours worked.
5. **Technical Completion (TECO - `IW32`):** The order is closed technically, indicating the pump is online.
6. **Settlement (`KO88`):** The costs (parts + labor) are settled to the Cost Center of the machine.

---

### Integration with Other Modules
* **MM (Materials Management):** Maintenance orders reserve spare parts from warehouse stock or generate purchasing requisitions for external repair services.
* **CO (Controlling):** Technical objects link to Cost Centers. Work orders collect maintenance costs and settle them to the owning department's cost center.
* **PP (Production Planning):** Major maintenance activities require booking machine downtime, which blocks PP work center capacity and prevents production schedulers from booking jobs on offline machinery.

---

### Real Industry Examples
* **Scenario:** A delivery truck reaches 15,000 miles. A measuring counter reading input (`IK11`) triggers a Preventive Maintenance plan (`IP10`). The system automatically creates a Maintenance Order for an oil change. The technician draws oil and filters from MM stock, performs the task, logs 2 hours of labor, and executes TECO. The costs are settled to the Logistics department's cost center.

---

### Interview Questions

#### Q1: What is the difference between Equipment and Functional Location?
**Answer:** 
* **Functional Location:** Represents a static physical area within a plant structure where operations are executed.
* **Equipment:** Represents a mobile, physical asset that can be installed, moved, or uninstalled from functional locations (e.g., a specific motor is installed in Functional Location A. Later, it is sent for repair and a new motor is installed there. The system tracks the history of both).

#### Q2: What does TECO stand for, and what are its consequences?
**Answer:** TECO stands for **Technical Completion**. Executing TECO for a Maintenance Order indicates that the physical repair work is complete. The system:
1. Deletes outstanding reservations for spare parts.
2. Re-enables capacity booking on the equipment.
3. Prevents further scheduling changes, while still allowing accounting postings (such as late invoices or labor confirmations) before the final Business Completion (CLSD) occurs.
