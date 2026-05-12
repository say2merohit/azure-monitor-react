"""
Extract data from PRTG xlsx and UptimeRobot CSV into JSON files for the React app.
"""
import json, csv, re, os
import pandas as pd

OUT = r"C:\Users\USER\Documents\azure-monitor-react\src\data"
PRTG_FILE = r"C:\Users\USER\Documents\Vertex\PRTGdata.xlsx"
UR_FILE   = r"C:\Users\USER\Documents\Vertex\uptimerobot-monitored-urls.csv"

# ─────────────────────────────────────────────────────────────────────────────
# PRTG category mapping (group name prefix → category)
# ─────────────────────────────────────────────────────────────────────────────
CATEGORY_MAP = {
    # Products-Plano-DC
    "VXcis Production URL Monitoring": "Products-Plano-DC",
    "VXcis Training URLs": "Products-Plano-DC",
    "Monitoring of Vxcis SSL Certs": "Products-Plano-DC",
    "VXcis Training URL": "Products-Plano-DC",
    "DataBank eCIS Essentials": "Products-Plano-DC",
    "PLANO VXexchange EDI Servers": "Products-Plano-DC",
    "Data Bank Prod servers": "Products-Plano-DC",
    "Databank _Plano- DC": "Products-Plano-DC",
    "Databank _Plano-DC": "Products-Plano-DC",
    # SLC-Data-Center
    "SALT LAKE CITY (SLC)_ DR": "SLC-Data-Center",
    "SLC GNG Form SERVERS": "SLC-Data-Center",
    "Salt Lake Servers": "SLC-Data-Center",
    # Azure-Cloud-Environments
    "Az Prod Cust": "Azure-Cloud-Environments",
    "Az Prod External": "Azure-Cloud-Environments",
    "Az Prod Internal": "Azure-Cloud-Environments",
    "NETWORK DEVICES (AZ_PROD)": "Azure-Cloud-Environments",
    "NETWORK DEVICES (AZ_DEV)": "Azure-Cloud-Environments",
    "AZ US WEST 3": "Azure-Cloud-Environments",
    "SERVERS (AZ_PROD)": "Azure-Cloud-Environments",
    "Azure Canada Fortinet Firewall": "Azure-Cloud-Environments",
    "AWS_CANADA_TUNNEL": "Azure-Cloud-Environments",
    # Firewalls-Security
    "Firewalls": "Firewalls-Security",
    "PCI Firewall": "Firewalls-Security",
    "BIG IP F5": "Firewalls-Security",
    # Customer-Remote-Sites
    "City of Redding": "Customer-Remote-Sites",
    "BHC": "Customer-Remote-Sites",
    "Overlook (Blue Plains)": "Customer-Remote-Sites",
    "RIDGETOP CIRCLE STERLING VA": "Customer-Remote-Sites",
    "College Parkway": "Customer-Remote-Sites",
    "FTC": "Customer-Remote-Sites",
    "Butte": "Customer-Remote-Sites",
    "EPCOR": "Customer-Remote-Sites",
    "Huron": "Customer-Remote-Sites",
    "Clearwater _ PCU": "Customer-Remote-Sites",
    "NWE": "Customer-Remote-Sites",
    "MSD-St. Louis": "Customer-Remote-Sites",
    "ROA": "Customer-Remote-Sites",
    "COR": "Customer-Remote-Sites",
    "LC": "Customer-Remote-Sites",
    "MSD": "Customer-Remote-Sites",
    "CCW": "Customer-Remote-Sites",
    "LWC": "Customer-Remote-Sites",
    "WOD": "Customer-Remote-Sites",
    "BASE": "Customer-Remote-Sites",
    "VGS": "Customer-Remote-Sites",
    "EPC": "Customer-Remote-Sites",
    "City Of Carrollton": "Customer-Remote-Sites",
    "City of Billings (COB)": "Customer-Remote-Sites",
    "WOR": "Customer-Remote-Sites",
    "KONA": "Customer-Remote-Sites",
    "CAR": "Customer-Remote-Sites",
    "BLL": "Customer-Remote-Sites",
    "BIL": "Customer-Remote-Sites",
    "NWE Servers": "Customer-Remote-Sites",
    "City of Carrolton Servers": "Customer-Remote-Sites",
    "NETWORK DEVICES (On-Premises)": "Customer-Remote-Sites",
    "GNG AIX DB servers": "Customer-Remote-Sites",
    # PRTG-System
    "Testing-T": "PRTG-System",
    "VertexOne PRTG": "PRTG-System",
    "VertexOne MONITORING TOOL": "PRTG-System",
    "AUI PEER": "PRTG-System",
}

def map_category(group):
    if not isinstance(group, str):
        return "PRTG-System"
    g = group.strip()
    # Exact match first
    if g in CATEGORY_MAP:
        return CATEGORY_MAP[g]
    # Prefix match
    for k, v in CATEGORY_MAP.items():
        if g.startswith(k) or g == k:
            return v
    # Fallback partial match
    for k, v in CATEGORY_MAP.items():
        if k.lower() in g.lower():
            return v
    return "Customer-Remote-Sites"  # default for unrecognized remote sites

def classify_sensor_type(sensor_name, sensor_raw=None):
    if not isinstance(sensor_name, str):
        return "Other"
    s = sensor_name.lower()
    if "ping" in s:
        return "Ping"
    if "http" in s:
        return "HTTP"
    if "ssl" in s or "certificate" in s or "cert" in s:
        return "SSL Cert"
    if "cpu" in s:
        return "CPU"
    if "memory" in s or "mem " in s:
        return "Memory"
    if "disk" in s or "volume" in s or "drive" in s or "storage" in s:
        return "Disk"
    if "traffic" in s or "bandwidth" in s or "interface" in s:
        return "Traffic"
    if "uptime" in s:
        return "Uptime"
    if "temp" in s or "temperature" in s:
        return "Temperature"
    if "fan" in s:
        return "Fans"
    if "power" in s or "psu" in s:
        return "Power"
    if "health" in s:
        return "Health"
    if ".com" in s or ".net" in s or "url" in s or "web" in s:
        return "URL Health"
    return "Other"

def map_status(status_str):
    if not isinstance(status_str, str):
        return "paused"
    s = status_str.strip().lower()
    if s == "up":
        return "up"
    if s in ("warning", "unusual"):
        return "warning"
    if s in ("down", "error"):
        return "down"
    if s in ("paused", "paused by dependency", "paused by schedule", "paused by user"):
        return "paused"
    return "paused"

print("Loading PRTG data...")
df = pd.read_excel(PRTG_FILE, sheet_name="Sensors_RAW")
print(f"  Loaded {len(df)} rows")

# Show unique groups to help with mapping
all_groups = df["Group"].dropna().unique()
print(f"  Unique groups ({len(all_groups)}):")
for g in sorted(all_groups):
    cat = map_category(g)
    print(f"    '{g}' -> {cat}")

sensors = []
for _, row in df.iterrows():
    group = str(row["Group"]) if pd.notna(row["Group"]) else ""
    device = str(row["Device"]) if pd.notna(row["Device"]) else ""
    sensor = str(row["Sensor"]) if pd.notna(row["Sensor"]) else ""
    status = map_status(str(row["Status"]) if pd.notna(row["Status"]) else "")
    last_val = str(row["Last Value"]) if pd.notna(row["Last Value"]) else ""
    stype = classify_sensor_type(sensor)
    category = map_category(group)
    sensors.append({
        "group": group,
        "device": device,
        "sensor": sensor,
        "stype": stype,
        "status": status,
        "last_val": last_val,
        "category": category,
    })

with open(os.path.join(OUT, "prtg_sensors.json"), "w", encoding="utf-8") as f:
    json.dump(sensors, f, ensure_ascii=False, indent=2)
print(f"  Wrote {len(sensors)} sensors to prtg_sensors.json")

# Show category counts
from collections import Counter
cats = Counter(s["category"] for s in sensors)
for cat, cnt in sorted(cats.items()):
    print(f"  {cat}: {cnt}")

# ─────────────────────────────────────────────────────────────────────────────
# UptimeRobot
# ─────────────────────────────────────────────────────────────────────────────
STATUS_MAP = {"2": "up", "9": "down", "0": "paused"}

def map_product(name, url):
    n = (name or "").strip().lower()
    # VXengage
    if n.startswith("vxengage"):
        return "VXengage"
    # VXretail / VXexchange
    if n.startswith("vxr") or n.startswith("vxrcp") or n in ("basepower", "tesla demo") or "vxretail" in n or "ecinfobill" in n or "vxrcp" in n:
        return "VXretail / VXexchange"
    if n.startswith("basep"):
        return "VXretail / VXexchange"
    # VXcis
    if "vxcis" in n or "cisessentials" in n:
        return "VXcis"
    # GNG
    if n.startswith("gng"):
        return "GNG"
    # VXconnect
    if "vxconnect" in n:
        return "VXconnect"
    # VXenterprise
    if "vxett" in n or "utiliport" in n or "vxeutiliport" in n or "vxtruetrack" in n or "pseg" in n:
        return "VXenterprise"
    # Customer Portals
    if "usermgmt" in n or "vssp" in n or (url and ("usermgmt" in url or "vssp" in url)):
        return "Customer Portals"
    return "Infrastructure / Other"

print("\nLoading UptimeRobot data...")
monitors = []
with open(UR_FILE, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        mid = row.get("id", "").strip()
        name = row.get("name", "").strip()
        url = row.get("url", "").strip()
        status_raw = row.get("status", "0").strip()
        status = STATUS_MAP.get(status_raw, "paused")
        product = map_product(name, url)
        monitors.append({
            "id": mid,
            "name": name,
            "url": url,
            "status": status,
            "product": product,
        })

with open(os.path.join(OUT, "uptimerobot.json"), "w", encoding="utf-8") as f:
    json.dump(monitors, f, ensure_ascii=False, indent=2)
print(f"  Wrote {len(monitors)} monitors to uptimerobot.json")

prods = Counter(m["product"] for m in monitors)
statuses = Counter(m["status"] for m in monitors)
print("  Products:", dict(prods))
print("  Statuses:", dict(statuses))

# ─────────────────────────────────────────────────────────────────────────────
# Azure KPIs (hardcoded)
# ─────────────────────────────────────────────────────────────────────────────
azure_kpis = {
    "tenant": "13fe76a6-6b4b-498e-a658-4cc38fbc52ec",
    "generated": "May 4, 2026",
    "totalRules": 545,
    "dcrVMs": 541,
    "dcrCount": 12,
    "kpis": [
        {"num": 545, "label": "Total Alert Rules", "sub": "All products", "cls": ""},
        {"num": 141, "label": "Sev0 — Critical", "sub": "Immediate action", "cls": "red"},
        {"num": 146, "label": "Sev1 — High", "sub": "Prompt response", "cls": "orange"},
        {"num": 72, "label": "CPU Rules", "sub": "Platform metric", "cls": "yellow"},
        {"num": 60, "label": "Disk Rules", "sub": "DCR → Log Analytics", "cls": "teal"},
        {"num": 61, "label": "Memory Rules", "sub": "Platform + Log", "cls": "purple"},
        {"num": 70, "label": "Up/Down Rules", "sub": "Activity Log", "cls": "grey"},
        {"num": 541, "label": "VMs via DCR", "sub": "12 DCRs · Vertex only", "cls": "green"},
    ],
}

with open(os.path.join(OUT, "azure_kpis.json"), "w", encoding="utf-8") as f:
    json.dump(azure_kpis, f, ensure_ascii=False, indent=2)
print("\nWrote azure_kpis.json")
print("\nAll done!")
