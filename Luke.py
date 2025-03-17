import pandas as pd
import sqlite3

import socket
import platform

# Read the data from the CSV file into the DataFrame object of pandas
customers_df = pd.read_csv('customer.csv')
orders_df = pd.read_csv('orders.csv')

#Merge the two dataframes into a new DataFrame based on the 'CustomerID' column
merged_df = pd.merge(orders_df, customers_df, on='CustomerID', how='inner')

# Calculate the total amount of each order (quantity * price)
merged_df['TotalAmount'] = merged_df['Quantity'] * merged_df['Price']

# Add status column by order date: If the order date starts with '2025-03', it is considered a new order, otherwise it is an old order
merged_df['Status'] = merged_df['OrderDate'].apply(lambda d: 'New' if d.startswith('2025-03') else 'Old')

# Select orders with total amount greater than 5000
high_value_orders = merged_df[merged_df['TotalAmount'] > 5000]

# Create an object to connect to the SQLite database
conn = sqlite3.connect('ecommerce.db')

# Define the SQL statement to create the table, or create a new table called 'HighValueOrders' if the table does not exist
create_table_query = '''
CREATE TABLE IF NOT EXISTS HighValueOrders (
    OrderID INTEGER,
    CustomerID INTEGER,
    Name TEXT,
    Email TEXT,
    Product TEXT,
    Quantity INTEGER,
    Price REAL,
    OrderDate TEXT,
    TotalAmount REAL,
    Status TEXT
)
'''
conn.execute(create_table_query)

#Use pandas' to_sql method to insert filtered high-value order data into the 'HighValueOrders' table in the SQLite database
high_value_orders.to_sql('HighValueOrders', conn, if_exists='replace', index=False)

# Query all records in the 'HighValueOrders' table and print them out
result = conn.execute('SELECT * FROM HighValueOrders')
for row in result.fetchall():
    print(row)

def get_machine_ip():
    # Get the hostname
    hostname = socket.gethostname()
    # Get the IP address
    ip_address = socket.gethostbyname(hostname)
    return ip_address

def get_machine_name():
    # Get the machine name using platform
    machine_name = platform.node()
    return machine_name

if __name__ == "__main__":
    ip = get_machine_ip()
    name = get_machine_name()
    print(f"Machine IP: {ip}")
    print(f"Machine Name: {name}")
    print("my name is Luke")

# Close the database connection
conn.close()

print("ETL process completed successfully!")