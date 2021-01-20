class User < ApplicationRecord
  has_secure_password
  has_many :votes, dependent: :destroy
  has_many :polls, through: :votes
  
  before_save { email.downcase! }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :name, :password, presence: true, length: { maximum: 50 }
  validates :email, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
end
