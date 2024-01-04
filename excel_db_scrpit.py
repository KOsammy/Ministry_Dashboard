import pandas as pd
import sqlite3

# Define file paths
excel_file = "GSCSP PROJECTS.xlsx"
db_file = "mydatabase.db"

# Read data from Excel
df = pd.read_excel(excel_file, sheet_name="UDG-1 Contracts ")

# Connect to SQLite database
conn = sqlite3.connect(db_file)

# Create table (adjust the columns and types as needed)
table_name = "UDG_1"
# conn.execute(f"""
# CREATE TABLE IF NOT EXISTS {table_name} (
#   id INTEGER PRIMARY KEY AUTOINCREMENT,
#   column1 TEXT,
#   column2 INTEGER,
#   ...
# );
# """)

# Insert data into table
for index, row in df.iterrows():
  values = tuple(row)
  conn.execute(f"""
  INSERT INTO {table_name} (id, Region, Municipal, type, Project_description, Project_name, contractor, Description_of_Contract, Total_Contract_Amount_GH₵ , Approved, Revised,  Physical, Status,	Start, Original, Expected, Time, revised_Completion)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  """, values)

# Commit changes and close connection
conn.commit()
conn.close()

print(f"Data successfully inserted into '{table_name}' table in '{db_file}'")
