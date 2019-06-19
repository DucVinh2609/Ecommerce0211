class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.datetime :date_order
      t.float :payment
      t.string :address
      t.string :note
      t.integer :status, null: false, default: 0


      t.timestamps
    end
  end
end
