class RemoveBreakTimestampsFromWorkDays < ActiveRecord::Migration[7.0]
  def change
    remove_column :work_days, :break_check_in_timestamp, :datetime
    remove_column :work_days, :break_check_out_timestamp, :datetime
  end
end
