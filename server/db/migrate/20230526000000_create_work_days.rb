class CreateWorkDays < ActiveRecord::Migration[7.0]
    def change
      create_table :work_days do |t|
        t.references :user, null: false, foreign_key: true
        t.datetime :check_in_timestamp
        t.datetime :check_out_timestamp
        t.datetime :break_check_in_timestamp
        t.datetime :break_check_out_timestamp
        t.timestamps
      end
    end
  end