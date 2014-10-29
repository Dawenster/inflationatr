class CreateInformationTable < ActiveRecord::Migration
  def change
    create_table :information_tables do |t|
      t.integer :count

      t.timestamps
    end
  end
end
