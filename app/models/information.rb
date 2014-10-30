class Information < ActiveRecord::Base
  def add_to_count(num_to_add)
    info = Information.last
    new_count = info.count + num_to_add.to_i
    info.update_attributes(:count => new_count)
  end
end