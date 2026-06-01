# SAP ECC Transaction Codes (T-Codes) & Tables Reference

This document serves as a quick-reference guide containing the most important SAP ECC T-Codes and database tables grouped by module.

---

## 1. Materials Management (MM)

### Transaction Codes (T-Codes)
| T-Code | Description | Component |
| :--- | :--- | :--- |
| **MM01 / MM02 / MM03** | Create / Change / Display Material Master | MM-BD |
| **ME51N / ME52N / ME53N** | Create / Change / Display Purchase Requisition | MM-PUR |
| **ME21N / ME22N / ME23N** | Create / Change / Display Purchase Order | MM-PUR |
| **MIGO** | Goods Movements (Receipt, Issue, Transfer Postings) | MM-IM |
| **MIRO** | Post Inbound Invoice (Invoice Verification) | MM-IV |
| **MMBE** | Stock Overview (Real-time plant stock levels) | MM-IM |
| **MB51** | Material Document List (Stock transaction audit log) | MM-IM |
| **ME41 / ME42 / ME47** | Create / Change RFQ / Maintain Vendor Quotes | MM-PUR |
| **ME11 / ME12 / ME13** | Create / Change / Display Purchase Info Record | MM-PUR |
| **ME01** | Maintain Source List | MM-PUR |

### Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **MARA** | General Material Data (Universal dimensions, Base Unit) | Master |
| **MARC** | Plant Data for Material (MRP, storage conditions per Plant) | Master |
| **MARD** | Storage Location Data (Stock quantities at Bin/SLoc level) | Master |
| **LFA1** | Vendor Master (General Details: Address, Contact Info) | Master |
| **LFB1** | Vendor Master (Company Code Details: Reconciliation Acct) | Master |
| **EINA** | Purchase Info Record (General Details) | Master |
| **EINE** | Purchase Info Record (Purchasing Org Details) | Master |
| **EKKO** | Purchasing Document Header (PO header parameters) | Transaction |
| **EKPO** | Purchasing Document Item (PO line details) | Transaction |
| **MKPF** | Material Document Header (Posting date, header text) | Transaction |
| **MSEG** | Material Document Item (Movement type, plant, quantity) | Transaction |
| **RBKP** | Invoice Verification Header (Vendor invoice parameters) | Transaction |
| **RSEG** | Invoice Verification Item (Matched PO lines, quantities, net) | Transaction |

---

## 2. Sales and Distribution (SD)

### Transaction Codes (T-Codes)
| T-Code | Description | Component |
| :--- | :--- | :--- |
| **VA01 / VA02 / VA03** | Create / Change / Display Sales Order | SD-SLS |
| **VL01N / VL02N / VL03N** | Create / Change / Display Outbound Delivery | SD-SHP |
| **VF01 / VF02 / VF03** | Create / Change / Display Billing Invoice | SD-BIL |
| **VK11 / VK12 / VK13** | Maintain Pricing Condition Records | SD-BF-PR |
| **XD01 / XD02 / XD03** | Create / Change / Display Customer Master (Central) | SD-MD |
| **VA11 / VA21** | Create Inquiry / Create Quotation | SD-SLS |
| **VL06O** | Outbound Delivery Monitor | SD-SHP |

### Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **KNA1** | Customer General Data (Name, Country, Address) | Master |
| **KNVV** | Customer Sales Area Data (Shipping limits, pricing variables) | Master |
| **VBAK** | Sales Document Header (Document date, pricing procedures) | Transaction |
| **VBAP** | Sales Document Item (Material, requested quantity, costs) | Transaction |
| **LIKP** | Delivery Header Data (Ship-to party, loading points) | Transaction |
| **LIPS** | Delivery Item Data (Picked quantities, packaging units) | Transaction |
| **VBRK** | Billing Document Header (Payer, billing conditions, VAT) | Transaction |
| **VBRP** | Billing Document Item (Revenues, item category, values) | Transaction |
| **VBFA** | Document Flow (Links PO -> SO -> Delivery -> Invoice) | Transaction |

---

## 3. Financials & Controlling (FICO)

### Transaction Codes (T-Codes)
| T-Code | Description | Component |
| :--- | :--- | :--- |
| **FB50 / FB01** | Post General Ledger Journal / Document Entry | FI-GL |
| **FB60 / FB70** | Post Vendor Invoice / Post Customer Invoice | FI-AP / AR |
| **F-53 / F-28** | Post Outbound Payment / Post Incoming Payment | FI-AP / AR |
| **FS00** | Edit G/L Account Centrally | FI-GL |
| **FAGLB03** | Display G/L Account Balances | FI-GL |
| **F.01** | Run Balance Sheet and P&L Report | FI-GL |
| **AFAB** | Execute Asset Depreciation Run | FI-AA |
| **OKKP** | Configure Controlling Area | CO |

### Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **SKA1** | G/L Account Master (Chart of Accounts parameters) | Master |
| **SKB1** | G/L Account Master (Company Code parameters) | Master |
| **BKPF** | Accounting Document Header (Document Type, Posting date) | Transaction |
| **BSEG** | Accounting Document Line Segment (Debit/Credit flags, Amount) | Transaction |
| **FAGLFLEXA** | G/L Actual Line Items (New G/L Ledger Details) | Transaction |
| **CSKS** | Cost Center Master Data | Master |
| **CSKB** | Cost Element Master Data | Master |
| **COSP** | CO Object: External Postings (Cost transactions from FI) | Transaction |

---

## 4. Production Planning (PP)

### Transaction Codes (T-Codes)
| T-Code | Description | Component |
| :--- | :--- | :--- |
| **CO01 / CO02 / CO03** | Create / Change / Display Production Order | PP-SFC |
| **MD01 / MD02 / MD04** | Run MRP / Run MRP (Single Item) / Stock-Reqs List | PP-MRP |
| **CS01 / CS02 / CS03** | Create / Change / Display Bill of Material (BOM) | PP-BD |
| **CA01 / CA02 / CA03** | Create / Change / Display Routing | PP-BD |
| **CR01 / CR02 / CR03** | Create / Change / Display Work Center | PP-BD |
| **CO11N / CO15** | Post Operation Confirmation / Order Confirmation | PP-SFC |

### Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **MAST** | Material to BOM Link | Master |
| **STKO** | BOM Header Details | Master |
| **STPO** | BOM Component Details (BOM line items) | Master |
| **PLKO** | Routing Header | Master |
| **PLPO** | Routing Operations (Tasks list, run-time schedules) | Master |
| **CRHD** | Work Center Header Details | Master |
| **AUFK** | Order Headers (Production, PM, Internal orders) | Transaction |
| **AFKO** | Order Header Data PP (MRP requirements, start dates) | Transaction |
| **AFPO** | Order Item Data (Finished output materials) | Transaction |

---

## 5. Warehouse Management (WM)

### Transaction Codes (T-Codes)
| T-Code | Description | Component |
| :--- | :--- | :--- |
| **LT01 / LT03** | Create Transfer Order / Create TO for Delivery | WM-TFR |
| **LT12** | Confirm Transfer Order | WM-TFR |
| **LS01N / LS02N / LS03N** | Create / Change / Display Storage Bin | WM-MD |
| **LS24** | Stock Overview per Material (Bin locations list) | WM-IM |
| **LX02** | Warehouse Inventory Stock List | WM-IM |

### Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **LAGP** | Storage Bins (Physical addresses list) | Master |
| **LQUA** | Quants (Physical stock quantity split inside individual bins) | Transaction |
| **LTAK** | Transfer Order Header | Transaction |
| **LTAP** | Transfer Order Item (Source bin, target bin, material) | Transaction |
| **LTBK** | Transfer Requirement Header | Transaction |
| **LTBP** | Transfer Requirement Item | Transaction |

---

## 6. Human Capital Management (HCM)

### Transaction Codes (T-Codes)
| T-Code | Description | Component |
| :--- | :--- | :--- |
| **PA30 / PA40** | Maintain HR Master Data / Run HR Actions | HR-PA |
| **PA20** | Display HR Master Data | HR-PA |
| **PPOME / PPOSE** | Maintain / Display Organizational Structure | HR-OM |
| **PC00_M99_CALC** | Run Payroll (Replace 99 with Country Code) | HR-PY |
| **PA61** | Maintain Time Data (Absence/Attendance) | HR-PT |

### Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **PA0001** | Org Assignment (Infotype 0001 - Company Code, Position, Cost Center) | Master |
| **PA0002** | Personal Data (Infotype 0002 - Name, Birthdate, Gender) | Master |
| **PA0006** | Addresses (Infotype 0006 - Employee contacts details) | Master |
| **PA0008** | Basic Pay (Infotype 0008 - Salary levels and allowances) | Master |
| **HRP1000** | OM Object (Positions, Departments, Jobs IDs) | Master |
| **HRP1001** | OM Relationships (Links Position to Org Unit) | Master |

---

## 7. System Administration & Basis

### Transaction Codes (T-Codes)
| T-Code | Description | Component |
| :--- | :--- | :--- |
| **SU01 / SU53** | User Maintenance / Check Authorization Failures | BC-SEC |
| **PFCG** | Role Maintenance & Security Profile Generator | BC-SEC |
| **SM36 / SM37** | Schedule Background Job / Job Monitor | BC-CCM |
| **ST22** | View ABAP Short Dumps (System code error logs) | BC-ABA |
| **SM21** | Read System Log | BC-CCM |
| **SM12** | Manage Lock Entries (Enqueue lock records) | BC-ABA |
| **SPAD / SP01** | Spool Administration / Output Controller | BC-CCM |
| **SM50 / SM51** | Work Process Overview / Application Server Monitor | BC-ABA |
| **STMS** | Transport Management System (Import/Export routes) | BC-CTS |
| **SE11** | ABAP Data Dictionary (Tables, elements, domains) | BC-ABA |
| **SE38 / SE80** | ABAP Editor / ABAP Workbench | BC-ABA |
