# SAP WM: Warehouse Management Module

This document provides a comprehensive breakdown of the **SAP WM (Warehouse Management)** module, which manages physical inventory at the bin level in SAP ECC.

---

### Module Overview
While Inventory Management (IM) tracks stock levels in terms of quantity and value at the *Storage Location* level (e.g., Plant 1000 has 50 units of item A), Warehouse Management (WM) manages the exact physical location of that stock down to the *Storage Bin* level (e.g., Row 4, Shelf 2, Bin A1). The primary objective of WM is to optimize warehouse space utilization and streamline physical picking/putaway processes.

---

### Key Functions
* **Goods Receipts & Putaway (WM-PP):** Directing incoming stock to the optimal physical bins based on predefined strategies.
* **Goods Issues & Picking (WM-PF):** Locating and retrieving materials from bins for outbound deliveries or production consumption.
* **Internal Stock Transfers:** Managing bin-to-bin movements, posting changes, and warehouse reorganization.
* **Physical Inventory (WM-PI):** Managing physical stock audits at the bin level to reconcile discrepancies with Inventory Management records.

---

### Important Master Data
* **Storage Bin (T-Codes `LS01N`/`LS02N`):** The smallest addressable unit of physical space in a warehouse (e.g., Bin `01-04-02` representing Row 1, Stack 4, Level 2).
* **Storage Type:** A division of a warehouse representing a physical area or zone (e.g., High Rack Area, Bulk Storage, Cold Storage, Interim Receipt Area `902`).
* **Storage Section:** A subdivision of a Storage Type grouping bins with similar properties (e.g., Fast-moving area, Heavy-parts area).
* **Quant (Table `LQUA`):** A system-generated record representing a specific batch of material located in a single storage bin. Created and deleted dynamically by stock movements.

---

### Common Transactions (T-Codes) & Tables

#### Core Transaction Codes
| T-Code | Description | Purpose |
| :--- | :--- | :--- |
| **LT01** | Create Transfer Order | Create a TO for general or manual stock movements |
| **LT03** | Create TO for Delivery | Create a TO to pick items for an Outbound Delivery |
| **LT12** | Confirm Transfer Order | Confirm that physical bin placement or picking has completed |
| **LS01N / LS02N / LS03N** | Storage Bin | Create / Change / Display Storage Bins |
| **LS24** | Bin Stock Overview | View what materials and quantities are stored in a specific bin |
| **LX02** | Stock List | Generate warehouse-wide stock inventory sheets |

#### Key Database Tables
| Table | Description | Type |
| :--- | :--- | :--- |
| **LAGP** | Storage Bins (Physical addresses list) | Master |
| **LQUA** | Quants (Physical stock quantities per bin) | Transaction |
| **LTAK** | Transfer Order Header | Transaction |
| **LTAP** | Transfer Order Item | Transaction |
| **LTBK** | Transfer Requirement Header | Transaction |
| **LTBP** | Transfer Requirement Item | Transaction |

---

### Business Processes
The standard stock movement workflow is:
1. **Inventory Movement Trigger:** A Goods Receipt (`MIGO`) in Inventory Management (IM) triggers an increase in stock.
2. **Transfer Requirement (TR):** An intermediate planning document (`LTBK`/`LTBP`) is automatically created to request physical stock movement.
3. **Transfer Order (TO - `LT01`):** The execution document indicating the source bin (e.g., interim GR area `902`) and target bin.
4. **Confirmation (`LT12`):** Once physical stock is placed in the target bin, the worker confirms the TO in the system, updating the status.

---

### Integration with Other Modules
* **MM (Materials Management):** Integrates via the connection between Plants/Storage Locations and the 3-digit Warehouse Number.
* **SD (Sales and Distribution):** Outbound deliveries in SD trigger Transfer Orders in WM to pick materials from storage bins before posting Goods Issue.
* **PP (Production Planning):** Production orders request materials, which are staged to production areas using Transfer Orders.

---

### Real Industry Examples
* **Scenario:** A delivery truck arrives with 10 pallets of engine oil. The receiving agent posts a Goods Receipt in `MIGO`. The stock is temporarily parked in Interim Area `902`. The coordinator converts the TR into a Transfer Order, routing the pallets to High Rack Storage `001` (Bin `01-12-03`). Once the forklift operator places the pallets, they confirm the TO in `LT12`.

---

### Interview Questions

#### Q1: What is a "Quant" in SAP WM?
**Answer:** A Quant is the lowest level of stock representation in WM. It represents a specific material, batch, stock category, and quantity residing in a single storage bin. Quants are created and deleted dynamically by the system (stored in table `LQUA`); you cannot create a quant manually.

#### Q2: What is an Interim Storage Area?
**Answer:** Interim storage areas are logical interfaces between Inventory Management (IM) and Warehouse Management (WM). They are designated with 9-series codes (e.g., `901` for GR production, `902` for GR external procurement, `916` for shipping deliveries). When a movement happens in IM, it is temporarily parked in an interim area until the corresponding Transfer Order is executed in WM to move it to a physical storage bin.
