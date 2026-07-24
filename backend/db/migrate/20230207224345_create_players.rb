class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.references :user, foreign_key: { to_table: :users }
      t.references :game, foreign_key: { to_table: :games }
      t.string :status
      t.string :color
      t.integer :queening

      t.timestamps
    end
  end
end