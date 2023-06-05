class CreateBreaks < ActiveRecord::Migration[7.0]
  def change
    create_table :breaks do |t|
      t.references :work_day, null: false, foreign_key: true
      t.datetime :check_in_timestamp
      t.datetime :check_out_timestamp

      t.timestamps
    end
  end
end
