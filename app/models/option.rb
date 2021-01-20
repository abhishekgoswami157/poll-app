class Option < ApplicationRecord
  belongs_to :poll
  validates :name, presence: true, length: { maximum: 100}
end
