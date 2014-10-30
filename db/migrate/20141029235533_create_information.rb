class CreateInformation < ActiveRecord::Migration
  def change
    create_table :information do |t|
      t.integer :count

      t.timestamps
    end
  end
end
