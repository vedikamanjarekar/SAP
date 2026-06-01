# SAP HCM: Human Capital Management Module

This document provides a comprehensive breakdown of the **SAP HCM (Human Capital Management)** module (formerly known as SAP HR), which manages employee lifecycle data and payroll in SAP ECC.

---

### Module Overview
SAP HCM integrates core human resources functions, ensuring administrative efficiency, payroll accuracy, legal compliance, and talent development. It keeps track of organizational hierarchies, employee master data, time tracking, and compensation records.

---

### Key Functions
* **Personnel Administration (PA):** Managing employee records, contracts, addresses, hiring details, and organizational movements.
* **Organizational Management (OM):** Structuring departments, positions, jobs, reporting lines, and cost center assignments.
* **Time Management (PT):** Tracking work schedules, shift plans, attendance, overtime, and leave management.
* **Payroll (PY):** Calculating salaries, deductions, taxes, direct deposits, and integration with financial ledgers.
* **Talent Management (PA-TM):** Overseeing recruitment, performance appraisal, training, and succession planning.

---

### Important Master Data
* **Infotype:** A temporal data container grouped by a 4-digit code (e.g., Infotype `0002` for Personal Data).
* **Personnel Object (Object P):** Represents the individual employee.
* **Organizational Unit (Object O):** Represents departments or corporate divisions.
* **Position (Object S):** Represents specific roles occupied by employees (e.g., "Senior Accountant").
* **Job (Object C):** Represents general role descriptions (e.g., "Accountant") used to define position requirements.

---

### Common Transactions (T-Codes) & Tables

#### Core Transaction Codes
| T-Code | Description | Purpose |
| :--- | :--- | :--- |
| **PA30 / PA40** | Maintain Master Data / Actions | Create or edit employee infotypes / Run hiring, transfers, or terminations |
| **PA20** | Display HR Master Data | View employee infotypes without edit mode |
| **PPOME / PPOSE**| Change / Display Org Structure | Maintain departments, positions, reporting relationships |
| **PC00_M99_CALC**| Payroll Driver | Run international payroll (replace 99 with Country Code, e.g. M10 for US) |
| **PA61** | Maintain Time Data | Log absences, attendances, and shifts |

#### Key Database Tables
Physical tables are named after the infotype number prefixed with `PA` (e.g., table `PA0001` stores Infotype 0001: Org Assignment).

| Table | Description | Type |
| :--- | :--- | :--- |
| **PA0001** | Org Assignment (Company Code, position, cost center links) | Master |
| **PA0002** | Personal Data (Names, DOB, gender) | Master |
| **PA0008** | Basic Pay (Salary grades, wages) | Master |
| **HRP1000** | OM Object (General definition of O, S, C objects) | Master |
| **HRP1001** | OM Relationships (Links positions to org units) | Master |

---

### Business Processes
The primary business cycle in HCM is the **Hire-to-Retire (H2R)** flow:
1. **Hiring Action (`PA40`):** Initiates a sequenced wizard of infotypes (IT0000 Actions, IT0001 Org Assignment, IT0002 Personal Data, IT0008 Basic Pay) to register a new employee.
2. **Organizational Assignment:** Links the employee (P) to a Position (S) which dictates reporting hierarchy.
3. **Time Tracking (`PA61`):** Captures daily timesheets or leave requests.
4. **Payroll Calculation (`PC00_M99_CALC`):** Computes gross salary, deducts taxes/benefits, generates bank transfer files, and posts financial accounts.
5. **Termination/Retirement (`PA40`):** Runs the termination action to deactivate the record when the employee leaves.

---

### Integration with Other Modules
* **FI (Financial Accounting):** Integrates at payroll runs. Salary postings write debit entries to expense G/L accounts and credit entries to bank/liabilities G/L accounts.
* **CO (Controlling):** Personnel cost planning retrieves salaries. Employees link to a cost center (`PA0001`), charging salary costs directly to Controlling area accounts.
* **PP (Production Planning):** Employee time sheets can link to PP work orders to log actual assembly labor hours.

---

### Real Industry Examples
* **Scenario:** An employee is hired as an engineer in the UK. The HR coordinator triggers a Hiring Action in `PA40`. When the coordinator completes IT0001, the system automatically retrieves Company Code `GB01` and links the cost center `ENG_DEPT` (CO module). When monthly payroll runs, the systems triggers a debit to England's engineering salary expense and a credit to the bank transfer account.

---

### Interview Questions

#### Q1: What is an "Infotype" in SAP HR?
**Answer:** An infotype is a logical grouping of related data fields containing temporal validity dates (start date and end date). They are designated by a 4-digit number (e.g., `0001` for Org Assignment, `0002` for Personal Data). Infotypes track history; when data changes, a new record is created with a new start date, while the previous record's end date is updated, maintaining a complete historical audit trail.

#### Q2: What is the difference between a Job and a Position in Organizational Management?
**Answer:**
* **Job (Object C):** A general classification or role within the company (e.g., "Software Engineer", "Manager").
* **Position (Object S):** A specific, concrete instance of a Job that can be occupied by a person (e.g., "Senior Software Engineer - Team A", Position ID `50004523`). Positions are occupied by employees (Object P), whereas Jobs are not.
