class Poll < ApplicationRecord
  has_many :options, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user
  
  accepts_nested_attributes_for :options, allow_destroy: true
  validates :title, presence: true, length: { minimum: 5, maximum: 300 }
end
