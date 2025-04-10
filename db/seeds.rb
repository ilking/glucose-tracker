# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'smarter_csv'

puts "Importing CGM data points from CSV..."

csv_file_path = Rails.root.join('db', 'cgm_data.csv')
counter = 0

# Using transaction for faster insertion
ActiveRecord::Base.transaction do
  SmarterCSV.process(csv_file_path, headers_in_file: true) do |chunk|
    chunk.each do |row|
      tested_at_str = row[:tested_at]
      tz_offset = row[:tz_offset].to_s.gsub('"', '')  # Remove any quotes
      value = row[:value].to_i

      # Parse the date more simply using Time.parse
      # Date format appears to be "MM/DD/YY HH:MM"
      date_parts = tested_at_str.split(' ')
      date = date_parts[0].split('/')
      time = date_parts[1].split(':')

      # Build date with proper components (20YY for year)
      month = date[0].to_i
      day = date[1].to_i
      year = "20#{date[2]}".to_i
      hour = time[0].to_i
      minute = time[1].to_i

      # Create a local datetime and store timezone separately
      tested_at = Time.new(year, month, day, hour, minute, 0)

      # Create the record
      GlucoseMeasurement.create!(
        user_id: "user-1",
        tested_at: tested_at,
        value: value,
        tz_offset: tz_offset
      )
    end

    counter += 1
  end
end

puts "Successfully imported #{counter} CGM data points."
