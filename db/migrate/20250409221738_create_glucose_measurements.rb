class CreateGlucoseMeasurements < ActiveRecord::Migration[8.0]
  def change
    create_table :glucose_measurements do |t|
      t.string :user_id
      t.integer :value
      t.datetime :tested_at
      t.string :tz_offset

      t.timestamps
    end
  end
end
