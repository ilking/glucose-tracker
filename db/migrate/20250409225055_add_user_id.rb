class AddUserId < ActiveRecord::Migration[8.0]
  def change
    change_column_default :glucose_measurements, :user_id, "user-1"
  end
end
