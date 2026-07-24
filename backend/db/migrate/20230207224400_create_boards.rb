class CreateBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.references :game, foreign_key: { to_table: :games }
      t.string :loc21
      t.string :loc31
      t.string :loc41
      t.string :loc51
      t.string :loc26
      t.string :loc36
      t.string :loc46
      t.string :loc56
      t.string :loc12
      t.string :loc13
      t.string :loc14
      t.string :loc15
      t.string :loc62
      t.string :loc63
      t.string :loc64
      t.string :loc65

      t.string :loc101
      t.string :loc102
      t.string :loc103
      t.string :loc104
      t.string :loc111
      t.string :loc112
      t.string :loc113
      t.string :loc114
      t.string :loc115
      t.string :loc116
      t.string :loc117
      t.string :loc118
      t.string :loc201
      t.string :loc202
      t.string :loc203
      t.string :loc204
      t.string :loc211
      t.string :loc212
      t.string :loc213
      t.string :loc214
      t.string :loc215
      t.string :loc216
      t.string :loc217
      t.string :loc218
      t.string :loc301
      t.string :loc302
      t.string :loc303
      t.string :loc304
      t.string :loc311
      t.string :loc312
      t.string :loc313
      t.string :loc314
      t.string :loc315
      t.string :loc316
      t.string :loc317
      t.string :loc318
      t.string :loc401
      t.string :loc402
      t.string :loc403
      t.string :loc404
      t.string :loc411
      t.string :loc412
      t.string :loc413
      t.string :loc414
      t.string :loc415
      t.string :loc416
      t.string :loc417
      t.string :loc418

      t.string :loc22
      t.string :loc23
      t.string :loc24
      t.string :loc25
      t.string :loc32
      t.string :loc33
      t.string :loc34
      t.string :loc35
      t.string :loc42
      t.string :loc43
      t.string :loc44
      t.string :loc45
      t.string :loc52
      t.string :loc53
      t.string :loc54
      t.string :loc55
      
      t.text :red_taken, array: true, default: []
      t.text :green_taken, array: true, default: []
      t.text :blue_taken, array: true, default: []
      t.text :yellow_taken, array: true, default: []

      t.timestamps
    end
  end
end
