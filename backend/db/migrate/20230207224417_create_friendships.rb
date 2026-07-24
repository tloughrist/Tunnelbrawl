class CreateFriendships < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.references :friender, foreign_key: { to_table: :users }
      t.references :friendee, foreign_key: { to_table: :users }
      t.string :status

      t.timestamps
    end
  end
end