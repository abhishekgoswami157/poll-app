class AddVoteCountsToOptions < ActiveRecord::Migration[6.0]
  def change
    add_column :options, :vote_count, :integer, default: 0
  end
end
