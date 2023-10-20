import pandas as pd
'''
# Read the CSV file into a DataFrame
input_csv_file = 'Flight_Schedule.csv'  # Change this to your CSV file path
output_csv_file = 'EV_Routes.csv'  # Change this to your desired output file path

df = pd.read_csv(input_csv_file)

# Remove columns with no entries
df_cleaned = df.dropna(axis=1, how='all')

# Save the modified DataFrame to a new CSV file (optional)
df_cleaned.to_csv(output_csv_file, index=False)

print(df_cleaned)


# Read the CSV file into a DataFrame
input_csv_file = 'EV_Routes.csv'  # Change this to your CSV file path
output_csv_file = 'output.csv'  # Change this to your desired output file path

df = pd.read_csv(input_csv_file)

# Drop duplicate rows based on 'Column1' and 'Column2'
df_cleaned = df.drop_duplicates(subset=['origin', 'destination'])

# Sort the DataFrame alphabetically based on 'Column1' and 'Column2'
df_sorted = df_cleaned.sort_values(by=['origin', 'destination'])

# Save the modified DataFrame to a new CSV file (optional)
df_sorted.to_csv(output_csv_file, index=False)

print(df_sorted)
'''


# Read the CSV file into a DataFrame
input_csv_file = 'output.csv'  # Change this to your CSV file path
output_csv_file = 'output2.csv'  # Change this to your desired output file path

df = pd.read_csv(input_csv_file)

# Remove rows with any empty values
df_cleaned = df.dropna()

# Save the modified DataFrame to a new CSV file (optional)
df_cleaned.to_csv(output_csv_file, index=False)

print(df_cleaned)
